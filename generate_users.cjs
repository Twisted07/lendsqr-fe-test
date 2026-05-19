const fs = require('fs');

const organizations = ['Lendsqr', 'Irorun', 'Lendstar'];
const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const firstNames = ['John', 'Jane', 'Adewale', 'Chidi', 'Grace', 'Emmanuel', 'Amaka', 'Tunde'];
const lastNames = ['Doe', 'Smith', 'Adeyemi', 'Okafor', 'Johnson', 'Eze', 'Nwachukwu'];
const domains = ['gmail.com', 'yahoo.com', 'lendsqr.com', 'hotmail.com'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    const dateJoined = new Date(Date.now() - Math.floor(Math.random() * 100000000000)).toISOString();
    
    users.push({
      id: i.toString(),
      organization: getRandom(organizations),
      username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandom(domains)}`,
      phone: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
      dateJoined,
      status: getRandom(statuses),
      personalDetails: {
        firstName,
        lastName,
        bvn: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        maritalStatus: getRandom(['Single', 'Married', 'Divorced']),
        children: Math.floor(Math.random() * 5),
        typeOfResidence: getRandom(["Parent's Apartment", "Own House", "Rented Apartment"])
      },
      educationAndEmployment: {
        level: getRandom(['B.Sc', 'M.Sc', 'Ph.D', 'O-Level']),
        employmentStatus: getRandom(['Employed', 'Unemployed', 'Self-Employed']),
        sector: getRandom(['FinTech', 'Education', 'Agriculture', 'Healthcare']),
        duration: `${Math.floor(1 + Math.random() * 10)} years`,
        officeEmail: `${firstName.toLowerCase()}@office.com`,
        monthlyIncome: [
          `₦${(Math.floor(100 + Math.random() * 400))},000.00`,
          `₦${(Math.floor(500 + Math.random() * 500))},000.00`
        ],
        loanRepayment: `₦${Math.floor(10 + Math.random() * 50)},000.00`
      },
      socials: {
        twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        facebook: `${firstName} ${lastName}`,
        instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`
      },
      guarantor: {
        firstName: getRandom(firstNames),
        lastName: getRandom(lastNames),
        phone: `070${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: `guarantor@${getRandom(domains)}`,
        relationship: getRandom(['Sister', 'Brother', 'Friend', 'Parent'])
      },
      bankDetails: {
        bank: getRandom(['Providus Bank', 'GTBank', 'Access Bank', 'First Bank']),
        accountBalance: `₦${Math.floor(10000 + Math.random() * 900000)}.${Math.floor(Math.random() * 99)}`,
        accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`
      }
    });
  }
  return users;
}

const users = generateUsers(500);
fs.writeFileSync('./public/users.json', JSON.stringify(users, null, 2));
console.log('Successfully generated 500 mock users at public/users.json');
