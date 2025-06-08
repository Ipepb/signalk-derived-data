module.exports = function (app, plugin) {
  return [
    {
      group: 'sensors',
      optionKey: 'mastSensor',
      title: 'Change rudderAngleSensor to mastRotation',
      derivedFrom: [
        'steering.rudderAngle'
      ],
      calculator: function (rudderAngle) {
        return [
          { path: 'sensors.mastRotation', value: rudderAngle }
        ];
      }
    }
  ];
};
