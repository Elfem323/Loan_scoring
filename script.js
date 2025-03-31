const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
let currentStep = 0;

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formSteps[currentStep].classList.remove("active");
        progressSteps[currentStep].classList.remove("active");
        currentStep++;
        formSteps[currentStep].classList.add("active");
        progressSteps[currentStep].classList.add("active");
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formSteps[currentStep].classList.remove("active");
        progressSteps[currentStep].classList.remove("active");
        currentStep--;
        formSteps[currentStep].classList.add("active");
        progressSteps[currentStep].classList.add("active");
    });
});

document.getElementById("loanAmount").addEventListener("input", calculateLoan);
document.getElementById("loanDuration").addEventListener("input", calculateLoan);

function calculateLoan() {
    let amount = document.getElementById("loanAmount").value || 0;
    let duration = document.getElementById("loanDuration").value || 1;
    let monthlyPayment = (amount / duration).toFixed(2);
    document.getElementById("loanEstimate").querySelector("span").textContent = `₦${monthlyPayment}`;
}
