library('ggplot2')
library('forecast')
library('tseries')
library('tidyverse')
library('rio')
library(readxl)

data1 <- import("/Users/andre/OneDrive/Desktop/Facultate/LICENTA/Cod Algoritm/datenoi/s20ultra.csv")

data1$DATES = as.Date(data1$Date)
data1$Month <- format(data1[,"DATES"], "%m")
ggplot(data1,aes(DATES,avgprice))+geom_line()+scale_x_date('Month')


count_PriceObject = ts(data1[,c('avgprice')])
data1$clean_count = tsclean(count_PriceObject)

data1$cnt_ma = ma(data1$clean_count, order=7)
data1$cnt_ma30 = ma(data1$clean_count, order=30)

ggplot() +
  geom_line(data = data1, aes(x = DATES, y = clean_count, colour = "Pre?? minim")) +
  geom_line(data = data1, aes(x = DATES, y = cnt_ma30, colour = "MA Lunar")) +
  xlab("Data") +
  ylab("Pre??") +
  ggtitle("Istoric pre?? iPhone Xs") +
  labs(colour="Legenda") +
  theme(plot.title = element_text(hjust = 0.5))

plot(data1["DATES"],data1["avgprice"])
count_ma = ts(na.omit(data1$cnt_ma),frequency = 30)
decomp = stl(count_ma, s.window = "periodic")
deseasonal_cnt <- seasadj(decomp)
plot(decomp)




adf.test(count_ma, alternative  = "stationary")


par(mfrow = c(1,2))
AutoCorrelation <- Acf(count_ma, lag.max = 130)
ParitialAutoCorrelation <- Pacf(count_ma)
plot(AutoCorrelation,main='')
plot(ParitialAutoCorrelation,main='')


par(mfrow = c(2,2),mai = c(0.35, 0.4, 0.3, 0.1))
count_d1 = diff(deseasonal_cnt, differences = 1)
plot(count_d1, main='Seria diferen??iata o data')
count_d1 = diff(deseasonal_cnt, differences = 2)
plot(count_d1, main='Seria diferen??iata de doua ori')
count_d1 = diff(deseasonal_cnt, differences = 3)
plot(count_d1, main='Seria diferen??iata de trei ori')
count_d1 = diff(deseasonal_cnt, differences = 4)
plot(count_d1, main='Seria diferen??iata de patru ori')
adf.test(count_d1, alternative = "stationary")

par(mfrow = c(1,2))
Acf(count_d1)
Pacf(count_d1)

Acf(count_ma)
Pacf(count_ma)

Acf(deseasonal_cnt, lag.max = 130)
Pacf(deseasonal_cnt)


fit <- auto.arima(count_ma, seasonal = FALSE)
tsdisplay(residuals(fit), lag.max = 45)
fcast <- forecast(fit,h=365, level=c(0))
plot(fcast)


fit <- auto.arima(count_ma, seasonal = FALSE)
tsdisplay(residuals(fit), lag.max = 45)

fit2 <- arima(count_ma, order=c(21,2,27))
tsdisplay(residuals(fit2), lag.max = 45)
fcast <- forecast(fit2,h=365)
plot(fcast)

fit2 <- arima(count_ma, order=c(35,2,2))
tsdisplay(residuals(fit2), lag.max = 45)
fcast <- forecast(fit2,h=365, level=c(0))
plot(fcast)


fit2 <- arima(count_ma, order=c(33,1,33))
tsdisplay(residuals(fit2), lag.max = 45)
fcast <- forecast(fit2,h=200)
plot



fit2 <- arima(count_ma, order=c(15,2,18))
tsdisplay(residuals(fit2), lag.max = 45)
fcast <- forecast(fit2,h=60)
plot(fcast)



df <- data..frame(fcast)
i <- 0
for (i in 1:60)
  df$date[i] = (as.Date("2020-06-25") + i)
write.csv(df,"C:\\Users\\andre\\OneDrive\\Desktop\\Facultate\\LICENTA\\Cod Algoritm\\test.csv", row.names = FALSE)
