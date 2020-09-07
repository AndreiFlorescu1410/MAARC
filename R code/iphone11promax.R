library('ggplot2')
library('forecast')
library('tseries')
library('tidyverse')
library('rio')
library(readxl)
#ARIMA(6,1,15)
data1 <- import("/Users/andre/OneDrive/Desktop/Facultate/LICENTA/Cod Algoritm/datenoi/iphone11promax.csv")

data1$DATES = as.Date(data1$date)
data1$Month <- format(data1[,"DATES"], "%m")
ggplot(data1,aes(DATES,min_price))+geom_line()+scale_x_date('Month')


count_PriceObject = ts(data1[,c('min_price')])
data1$clean_count = tsclean(count_PriceObject)

data1$cnt_ma = ma(data1$clean_count, order=7)
data1$cnt_ma30 = ma(data1$clean_count, order=30)

ggplot() +
  geom_line(data = data1, aes(x = DATES, y = clean_count, colour = "Preț minim")) +
  geom_line(data = data1, aes(x = DATES, y = cnt_ma30, colour = "MA Lunar")) +
  xlab("Data") +
  ylab("Preț") +
  ggtitle("Istoric preț Telefon mobil Apple iPhone X, 64GB, Space Grey") +
  labs(colour="Legenda") +
  theme(plot.title = element_text(hjust = 0.5))

plot(data1["DATES"],data1["cnt_ma30"])
count_ma = ts(na.omit(data1$cnt_ma),frequency = 30)
decomp = stl(count_ma, s.window = "periodic")
deseasonal_cnt <- seasadj(decomp)
plot(decomp)




adf.test(count_ma, alternative  = "stationary")


par(mfrow = c(1,2), mai = c(0.85, 0.85, 0.1, 0.1))
AutoCorrelation <- Acf(count_ma, lag.max = 50)
ParitialAutoCorrelation <- Pacf(count_ma, lag.max = 60)
plot(AutoCorrelation,main='')
plot(ParitialAutoCorrelation,main='')


par(mfrow = c(2,2),mai = c(0.35, 0.4, 0.3, 0.1))
count_d1 = diff(deseasonal_cnt, differences = 1)
plot(count_d1, main='Seria diferențiata o data')
count_d1 = diff(deseasonal_cnt, differences = 2)
plot(count_d1, main='Seria diferențiata de doua ori')
count_d1 = diff(deseasonal_cnt, differences = 3)
plot(count_d1, main='Seria diferențiata de trei ori')
count_d1 = diff(deseasonal_cnt, differences = 4)
plot(count_d1, main='Seria diferențiata de patru ori')
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
fcast <- forecast(fit,h=100)
plot(fcast)


fit <- auto.arima(count_ma, seasonal = FALSE)
tsdisplay(residuals(fit), lag.max = 45)

fit2 <- arima(count_ma, order=c(1,1,1))
tsdisplay(residuals(fit2), lag.max = 45)
fcast <- forecast(fit2,h=365)
plot(fcast)

fcast

fit3 <- arima(count_ma, order=c(7,2,36))
tsdisplay(residuals(fit3), lag.max = 45)
fcast <- forecast(fit3,h=200)
plot(fcast)

fcast
fit2 <- arima(count_ma, order=c(6,1,15))
tsdisplay(residuals(fit2), lag.max = 45)
fcast <- forecast(fit2,h=180)
plot(fcast)

fcast
df <- data.frame(fcast)
i <- 0
df$date = as.Date("2020-06-24")
for (i in 1:180)
  df$date[i] = (as.Date("2020-06-24") + i)
write.csv(df,"C:\\Users\\andre\\OneDrive\\Desktop\\Facultate\\LICENTA\\Cod Algoritm\\predictions\\s20plus.csv", row.names = FALSE)




fitfinal <- fit2
tsdisplay(residuals(fitfinal), lag.max = 45)
fcast <- forecast(fitfinal,h=150)
plot(fcast)



par(mfrow = c(2,2),mai = c(0.35, 0.4, 0.3, 0.1))
plot(forecast(fit,h=150))

plot(forecast(fit2,h=150))
plot(forecast(fit3,h=150))
plot(forecast(fitfinal,h=150))
