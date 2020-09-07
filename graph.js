var marketing = ['14-Nov-19', '21-Sep-19'];
var amount = ['Black Friday', 'Lansare iPhone'];
var annotations = marketing.map(function (date, index) {
   return {
      type: 'line',
      id: 'vline' + index,
      mode: 'vertical',
      scaleID: 'x-axis-0',
      value: date,
      borderColor: 'black',
      borderWidth: 1,
      label: {
         enabled: true,
         position: "top",
         content: amount[index]
      }
   }
});