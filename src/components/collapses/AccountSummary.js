import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text  } from 'react-native';
import { Avatar, Badge ,ListItem ,List } from 'react-native-elements'


const DATA = [
  {
    id:'1',
    count: '11',
    title: 'Open accounts',
    error:false
  },
  {
    id:'2',
    count: '0',
    title: 'Self-reported accounts',
    error:false
  },
  {
    id:'3',
    count: '3',
    title: 'Accounts ever late',
    error:true
  },
  {
    id:'4',
    count: '26',
    title: 'Closed accounts',
    error:false
  },
  {
    id:'5',
    count: '1',
    title: 'Collections',
    error:true
  }
];

// function Item({ title , count , error }) {
//   return (
//     <View style={styles.item} style={styles.listContent}>
//         <Text style={styles.title}>{title}</Text>
//         <Text  style={[styles.countValue, (error)? styles.textError : styles.textNormal]}>{count}</Text>
//     </View>
//   );
// }

function AccountSummmary() {
  return (
    <View style={styles.container}>
        <View style={styles.description}> 
        {DATA.map(item  => (
            <View key={item.id} style={styles.item} style={styles.listContent} >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={[styles.countValue, (item.error)? styles.textError : styles.textNormal]}>{item.count}</Text>
            </View>
        ))}
      </View>
     </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 1
    },
    textError : {
        color:'#9E2118'
    },
    textNormal : {
        color:'#404141'
    },
    countValue : {
        width:20,
        height:20,
        fontWeight:'bold'
    },
    description: {
        padding: 15,
        borderColor: '#EFF0F1',
        borderTopWidth: 1,
        borderTopEndRadius: 5
    },
    listContent : {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5
    },
    item: {
        borderBottomColor:'gray',
        borderWidth:1,
        padding: 2,
        // marginVertical: 5,
        // marginHorizontal: 16,
    },
    title: {
        color:'#696F71',
        fontSize: 14,
    },
});

export {AccountSummmary};