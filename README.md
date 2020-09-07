<h1 align="center">
  <a href="http://www.maarc.tk/"><img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/glogos.png?raw=true" alt="MAARC"></a>
</h1>


<h4 align="center">The project is now live here <a href="http://www.maarc.tk/" target="_blank">MAARC.tk</a>.</h4>


<p align="center">
    <a href="https://github.com/ArmynC/ArminC-AutoExec/commits/master">
    <img src="https://img.shields.io/github/last-commit/AndreiFlorescu1410/MAARC"
         alt="GitHub last commit">
    <a href="http://www.maarc.tk/">
    <img src="https://img.shields.io/website?url=http%3A%2F%2Fwww.maarc.tk%2F"
         alt="Website">
    <img src="https://img.shields.io/github/languages/count/AndreiFlorescu1410/MAARC?color=light%20green"
         alt="MIT License">   
       <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-green.svg"
         alt="MIT License">   
      
      
      
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#app-screenshots">App Screenshots</a> •
  <a href="#arima-models">ARIMA models</a> •
  <a href="#attention-in-cnn">Attention in CNN</a> •
  <a href="#back-end-server">Back-end server</a>
</p>

---

## About

<table>
<tr>
<td>
  <ul>
    <li>  <strong>MAARC</strong> is a web-based solution, built from scratch, for misleading price advertising by providing the user easy-to-read graphs and predictions of the price for a specific product. </li>
  <li>Structuring the price data as a time series I've used ARIMA models for predicting the future shape of price evolution. </li>
  <li>Constantly changing URL of a product made it opportune to develop a fine grained image classifier based on a pre-trained VGG-16 with added attention layers which solves the problem with a accuracy of 99%.</li>
</ul>
</p>

</td>
</tr>
</table>


## App Screenshots

Homepage         |  Product page | Search engine       |  Register form
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/ghomepage.gif?raw=true" title="Desktop App  Login " width="100%"> |<img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/gprod.PNG?raw=true" title="Desktop App Open" width="100%">|<img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/gsearch.PNG?raw=true" title="Web App  PC  Drivers" width="100%"> |<img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/glogin.PNG?raw=true" title="Web App  PC  Drivers" width="100%">


## ARIMA models

Predicting the price of a product it's made by training ARIMA models for each product. The training process depends on the size of the dataset and the volatility of the price.
The process consists of 4 steps that must be repeated for each product.
<p align="center">
 <img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/garima.jpg?raw=true" width="600" alt="ARIMA models">   
  </p>
  
  
## Attention in CNN

Integration with markets where users can sell or buy products cheaper, like OLX, has been a focus when developing the project. Since products from the same maker have almost the same name, which is not differentiated by the site's search engine, I've devoleped fine grained image classifier improving the difference between real price and predicted price to <100 RON (>500 RON without the classifier).


This has been achieved by training a VGG-16 model and changing the architecture by adding 3 attention layers in feature extraction layers(before a maxpool layer).
<p align="center">
<img src="https://github.com/AndreiFlorescu1410/MAARC/blob/master/poze/gvgg.png?raw=true" width="550" alt="Vgg-16 model">   
</p>
After training for 80 epochs, the training and validation accuracy reach 99%.

## Back-end server
The web app it's connected to the database using a node.js server, which handles all the queries for fetching data. The server among with the database is hosted using Heroku dyno and ClearDB MySQL for 24/7 availability.
