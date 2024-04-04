// app.js

document.addEventListener('DOMContentLoaded', function () {
    fetchExpensesData();
});

function fetchExpensesData() {
    fetch('http://your-backend-url/expenses') // Replace 'http://your-backend-url/expenses' with your actual backend endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const categories = data.map(expense => expense.category);
            const amounts = data.map(expense => expense.amount);

            renderExpensesChart(categories, amounts);
        })
        .catch(error => console.error('Error fetching expenses data:', error));
}

function renderExpensesChart(categories, amounts) {
    var ctx = document.getElementById('expensesChart').getContext('2d');
    var expensesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
