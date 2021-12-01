function expenseSubmit(event) {
    event.preventDefault();
    const form=new FormData(event.target)
    const expenseDetails={
        amount:form.get(`expenseAmount`),
        category:form.get(`category`),
        description:form.get(`description`)
    }
    console.log(expenseDetails);
    
}
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['salary',     11],
        ['food',      2],
        ['fuel',  2],
        ['electricity', 2],
        ['rent',    7],
      ]);
    
    var options = {
        title: '',
        pieHole: 0.4,
      };
    
    var chart = new google.visualization.PieChart(document.getElementById('myChart'));
      chart.draw(data, options);
    }