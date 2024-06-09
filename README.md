# nyntax-car-server
## About the Reservation calculation
- In the back end I used MongoDB database and I created a collection called Charge Summary. If any customer takes any vehicle and weekly daily charges are calculated here. According to Additional Charges there is a field called "Rental Tax" amounts given in percentages rather than dollars. Which I found a bit challenging to handle, I have deducted 11.5% of this rental tax on the total of daily weekly and hourly charges. And the rest of the calculations are all done at the back end. 
- And I thought that here I will use stock how many cars are in stock but since you have provided me an api I have not done that, a customer can only use one car and no other customer can take that car until that car is return.

## Bonus: 
- As for the bonus, it says I will be given a Tesla that will cut $10 per hour and $50 per day. In this case I would say since it says hourly $10 and charge $50 per day, so if a customer hires hourly be it 6 hours or 8 hours then I will deduct the charge at the hourly rate. And if he takes it as a day, then I will deduct the charge as a day.
- if a countomer hires as a day, if he does not take the whole day, if he takes half time, I will deduct the charge as a daily rate 50$. And I will follow this rule regarding weekly car rental also. 

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
