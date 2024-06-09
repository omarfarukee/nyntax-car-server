# nyntax-car-server
## About the Reservation calculation
- In the back end I used MongoDB database and I created a collection called Charge Summary. If any customer takes any vehicle and weekly daily charges are calculated here. According to Additional Charges there is a field called "Rental Tax" amounts given in percentages rather than dollars. Which I found a bit challenging to handle, I have deducted 11.5% of this rental tax on the total of daily weekly and hourly charges. And the rest of the calculations are all done at the back end. 
- And I thought that here I will use stock how many cars are in stock but since you have provided me an api I have not done that, a customer can only use one car and no other customer can take that car until that car is return.

## how to run in local host -

- First clone the repository 
- Open the repository on vs code 
- Open terminal select git bash
  
## Installation
Install this 
```bash
  npm i express cors dotenv mongodb mongoose
```
```bash
  npm install -g nodemon
```
- After that enter "nodemon" command.
- The localhost running on your browser successfully.
