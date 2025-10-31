    const incomeTable = document.getElementById("income-table");
    const expenseTable = document.getElementById("expense-table");

    const incomeNameInput = document.getElementById("income-name");
    const incomeAmountInput = document.getElementById("income-amount");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");

    const addIncomeBtn = document.getElementById("add-income");
    const addExpenseBtn = document.getElementById("add-expense");

    const totalIncomeDisplay = document.getElementById("total-income");
    const totalExpensesDisplay = document.getElementById("total-expenses");

    const profitBox = document.getElementById("profit")

    const sign = document.getElementById("sign");

    const incomes = [];
    const expenses = [];

    function updateTotals() {
      const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
      const profit = totalIncome - totalExpenses
      if(profit == 0){
         profitBox.textContent = ""
      }
      else{
        profitBox.textContent = profit > 0 ? `You profit by ${sign.value} ${profit}` : `You are losing  ${sign.value} ${profit * -1}`
      }
      
      
      totalIncomeDisplay.textContent = `${sign.value} ${totalIncome.toFixed(2)}`;
      totalExpensesDisplay.textContent = `${sign.value} ${totalExpenses.toFixed(2)}`;
    }

    function renderTable(table, items, type) {
      table.innerHTML = "";
      items.forEach((item, index) => {
        
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const amountCell = document.createElement("td");
        amountCell.textContent = `${sign.value} ${item.amount}`;

        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.id = "deleteBtn"
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
          items.splice(index, 1);
          renderTable(table, items, type);
          updateTotals();
        };

        actionCell.appendChild(deleteBtn);
        row.appendChild(nameCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        table.appendChild(row);
      });
    }

    addIncomeBtn.onclick = () => {
      if(sign.value.length > 3){
        profitBox.textContent = "Invalid currency sign"
        return
      }
      const name = incomeNameInput.value.trim();
      const amount = parseFloat(incomeAmountInput.value);
      if (!name || isNaN(amount)) return;

      incomes.push({ name, amount });
      renderTable(incomeTable, incomes, "income");
      updateTotals();

      incomeNameInput.value = "";
      incomeAmountInput.value = "";
    };

    addExpenseBtn.onclick = () => {
      if(sign.value.length > 3){return}
      const name = expenseNameInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value);
      if (!name || isNaN(amount)) return;

      expenses.push({ name, amount });
      renderTable(expenseTable, expenses, "expense");
      updateTotals();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    };