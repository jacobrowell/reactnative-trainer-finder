import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native';

const BMR = ({ profile }) => {
  const [BMRvalue, updateBMR] = useState(0);
  const [targetValue, updateTarget] = useState(0);
  const [verb, updateVerb] = useState('');

  useEffect(() => {
    calculateBMR();
  }, []);

  const calculateBMR = () => {
    let BMR, target;
    let W = Number(profile.weight.split(' ')[0]) * 0.453592;
    let HeightFt = profile.height.split("'")[0];
    let HeightIn = profile.height.split("'")[1];
    let H = Number(HeightFt) * 30.48 + Number(HeightIn.slice(0, HeightIn.length - 1)) * 2.54;
    let keyword = profile.weekly_goal.split(' ')[0];
    let diff = Number(profile.weekly_goal.split(' ')[1]);
    if (profile.gender === 'Female') {
      BMR = Math.round(10 * W + 6.25 * H - 5 * profile.age - 161);
    } else {
      BMR = Math.round(10 * W + 6.25 * H - 5 * profile.age + 5);
    }
    if (profile.activity_lvl === 'Active') {
      BMR = Math.round(BMR * 1.5);
    }
    if (profile.activity_lvl === 'Not Active') {
      BMR = Math.round(BMR * 1.2);
    }
    if (profile.activity_lvl === 'Lightly Active') {
      BMR = Math.round(BMR * 1.4);
    }
    if (profile.activity_lvl === 'Very Active') {
      BMR = Math.round(BMR * 1.8);
    }
    if (keyword === 'Lose') {
      target = BMR - diff * 500;
      updateVerb('reduce');
      updateTarget(target);
    }
    if (keyword === 'Gain') {
      target = BMR + diff * 500;
      updateVerb('increase');
      updateTarget(target);
    }
    if (keyword === 'Maintain') {
      updateVerb('maintain');
    }
    updateBMR(BMR);
  }
  return (
    <View style={styles.BMR}>
      <Text style={styles.BMRstatement}>
        "In order to&nbsp;
        <Text style={styles.number}>
          {profile.weekly_goal[0].toLowerCase()}{profile.weekly_goal.slice(1)}
        </Text>,&nbsp;
        { verb === 'maintain' ? (
          <Text>
            your daily calorie intake will be&nbsp;
              <Text style={styles.number}>
                {BMRvalue}
              </Text> 
              &nbsp;calories per day."
          </Text>
        ) : (
          <Text>
            you will need to&nbsp;
            <Text style={styles.number}>
              {verb} 
            </Text>
            &nbsp;your daily calorie intake 
            from your normal maintenance level of&nbsp;
            <Text style={styles.number}>
              {BMRvalue} 
            </Text>
            &nbsp;calories per day, to&nbsp;
            <Text style={styles.number}>
              {targetValue} 
            </Text>
            &nbsp;calories per day."
          </Text>
        ) }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  BMR: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    backgroundColor: 'rgb(62,69,73)'
  },
  BMRstatement: {
    color: 'rgb(240,240,240)',
    lineHeight: 20
  },
  number: {
    color: 'rgb(230,94,80)',
    fontWeight: 'bold'
  }
});

export default BMR;