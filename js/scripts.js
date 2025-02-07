document.addEventListener('DOMContentLoaded', function () {
    // Function to get values from input fields
    function getValues() {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const incomes = [];
        const expenses = [];

        months.forEach(month => {
            const income = document.getElementById(`income-${month}`).value || 0;
            const expense = document.getElementById(`expenses-${month}`).value || 0;
            incomes.push(parseFloat(income));
            expenses.push(parseFloat(expense));
        });

        return { incomes, expenses };
    }

    // Initialize the chart
    var ctx = document.getElementById('myBarChart').getContext('2d');
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Income',
                data: getValues().incomes,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: getValues().expenses,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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

    // Update chart data when input values change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function () {
            const values = getValues();
            myBarChart.data.datasets[0].data = values.incomes;
            myBarChart.data.datasets[1].data = values.expenses;
            myBarChart.update();
        });
    });

    // Download chart as image
    document.getElementById('downloadChart').addEventListener('click', function () {
        var link = document.createElement('a');
        link.href = myBarChart.toBase64Image();
        link.download = 'chart.png';
        link.click();
    });
});