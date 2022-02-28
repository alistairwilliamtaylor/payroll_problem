const grossIncome = salary => salary / 12;
const incomeTax = salary => {
        if (salary < 18200) {
            return 0
        } else if (salary <= 37000) {
            return (salary - 18200) * .19;
        } else if (salary <= 87000) {
            return 3572 + (salary - 37000) * .325;
        } else if (salary <= 180000) {
            return 19822 + (salary - 87000) * .37;            
        } else {
            return 54232 + (salary - 180000) * .45
        } 
}

console.log(incomeTax(72000));