function checkLoanEligibility(income, loanAmount, duration) {
    const monthlyRepayment = loanAmount / duration;
    return income >= 3 * monthlyRepayment;
}

module.exports = { checkLoanEligibility };
