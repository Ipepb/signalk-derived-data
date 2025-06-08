module.exports = function (app, plugin) {
  return [
    {
      group: 'wind',
      optionKey: 'ipe3Wind',
      title: 'corrigeer AWA voor mastrotatie',
      derivedFrom: [
        'steering.rudderAngle',
        'environment.wind.angleApparent'
      ],
      calculator: function (mastRotAngle, awa) {
        // Controleer de bron van environment.wind.angleApparent
        var sourceInfo = app.getSelfPath('environment.wind.angleApparent.$source');
        var shortSource = sourceInfo ? sourceInfo.substring(0, 4) : null;

        // Debugregel om de gevonden bron weer te geven
        // console.log('Gevonden bron voor environment.wind.angleApparent:', shortSource);

        // mastrotatie weergevn in log
        // console.log('mastRotAngle:', mastRotAngle);

        // Alleen doorgaan als de bron 'can0' is
        if (shortSource === 'can0') {
          // console.log('Aan bronvoorwaarde is voldaan');
          // Windberekeningen alleen met de waarde van 'can0'
          var angle = awa - mastRotAngle;

          return [
            { path: 'environment.wind.angleApparent', value: angle },
            { path: 'sensors.mastRotation', value: mastRotAngle }
          ];
        } else {
          // Als de bron niet 'can0' is, retourneer een lege array of iets anders
          // console.log('Niet voldaan, bron is', shortSource);
          return [];
        }
      }
    }
  ];
};
