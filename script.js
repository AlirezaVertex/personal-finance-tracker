const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  transactionList.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type);
    li.innerHTML = `
      ${transaction.description} - ${transaction.amount}
      <button onclick="deleteTransaction(${index})">❌</button>
    `;

    transactionList.appendChild(li);

    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  totalIncomeEl.textContent = totalIncome;
  totalExpenseEl.textContent = totalExpense;
  balanceEl.textContent = totalIncome - totalExpense;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const newTransaction = {
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    type: typeInput.value
  };

  transactions.push(newTransaction);
  updateUI();

  descriptionInput.value = "";
  amountInput.value = "";
});

updateUI();