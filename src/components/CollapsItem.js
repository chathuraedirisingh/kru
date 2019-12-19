import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import List from './enum'
import colors from '../styles/colors'

import {
    Dimensions,
    Text,
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableHighlight,
    FlatList,
    ScrollView,
    ActivityIndicator,
    TouchableWithoutFeedback
  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { Avatar, Badge } from 'react-native-elements'

import {
      AutoLoan,
      Compliance,
      AccountSummmary,
      Blank
} from './collapses'

const propTypes = {
    item: PropTypes.object
};

class CollapsItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chooseExpandView: List.DEFAULT
        }
    }

    expand = (expand) => {
        this.setState((prevState, prevProps) => ({
            chooseExpandView: (expand === prevState.chooseExpandView) ? List.DEFAULT : expand
        }));
    };

    renderView = (param) => {
        if (param === List.AUTO_LOAN) {return ( < AutoLoan /> )} 
        else if (param === List.COMPLIANCE) {return ( < Compliance /> )}
        else if (param === List.ACCOUNT_SUMMARY) {return ( < AccountSummmary /> )}
        else {return ( < Blank /> )}
    }

    render() {
        const { chooseExpandView } = this.state;
        const UP_ARROW_ICON = require('../../assets/b-arrow-up.png');
        const DOWN_ARROW_ICON = require('../../assets/b-arrow-down.png');
        return(
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.AUTO_LOAN)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="car" size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Auto Loan Information</Text>
                                        <Image source = { chooseExpandView === List.AUTO_LOAN ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>$1,796 - Remaining Balance {"\n"}89% paid off</Text>
                                                </View>
                                            </View>
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>1</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.AUTO_LOAN && this.renderView(List.AUTO_LOAN) }
                        </View>
{/* ------------------------------ item 02-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.COMPLIANCE)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="bell"  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Red Flag Compliance</Text>
                                        <Image source = { chooseExpandView === List.COMPLIANCE ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="warning"/>
                                                    <Text style={styles.listText}>Fact Act:  Fraud alert present</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="warning"/>
                                                    <Text style={styles.listText}>Identify alerts: Discrepancy found</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="error"/>
                                                    <Text style={styles.listText}>OFAC:  Possible match found</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>1</Text>
                                            </View> */}
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.COMPLIANCE && this.renderView(List.COMPLIANCE) }
                        </View>
{/* ------------------------------ item 03-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.FRAUD_CHECK)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="user-secret"  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Fraud Checks</Text>
                                        <Image source = { chooseExpandView === List.FRAUD_CHECK ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Fraud Index:  No alerts</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Synthetic Fraud: No alerts</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Fraudulent Activity:  No match</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>1</Text>
                                            </View> */}
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.FRAUD_CHECK && this.renderView(List.FRAUD_CHECK) }
                        </View>
                        {/* ------------------------------ item 04-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.BORROWER_INTELLIGENCE)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="lightbulb-o" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Borrower Intelligence</Text>
                                        <Image source = { chooseExpandView === List.BORROWER_INTELLIGENCE ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>Income = $100,000 / yr.</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>Estimated Pay-off = $978.45</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>Vehicle Equity = $2,500</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>11</Text>
                                            </View> */}
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.BORROWER_INTELLIGENCE && this.renderView(List.BORROWER_INTELLIGENCE) }
                        </View>

           {/* ------------------------------ item 05-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.MILITARY_ACT)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="lock" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Military Lending Act</Text>
                                        <Image source = { chooseExpandView === List.MILITARY_ACT ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>MLA – No match</Text>
                                                </View>
                                            </View>
                                            {/* <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>11</Text>
                                            </View> */}
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.MILITARY_ACT && this.renderView(List.MILITARY_ACT) }
                        </View>

            {/* ------------------------------ item 06-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.ACCOUNT_SUMMARY)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="pie-chart" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Account Summary</Text>
                                        <Image source = { chooseExpandView === List.ACCOUNT_SUMMARY ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            {/* <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Fraud Index:  No alerts</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Synthetic Fraud: No alerts</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Fraudulent Activity:  No match</Text>
                                                </View>
                                            </View> */}
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>11</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.ACCOUNT_SUMMARY && this.renderView(List.ACCOUNT_SUMMARY) }
                        </View>

            {/* ------------------------------ item 07-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.CREDIT_USAGE)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="tachometer" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Overall Credit Usage</Text>
                                        <Image source = { chooseExpandView === List.CREDIT_USAGE ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            {/* <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Income = $100,000 / yr.</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Estimated Pay-off = $978.45</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Vehicle Equity = $2,500</Text>
                                                </View>
                                            </View>  */}
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>$50,850</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.CREDIT_USAGE && this.renderView(List.CREDIT_USAGE) }
                        </View>
           {/* ------------------------------ item 08-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.DEBT_SUMMARY)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="tag" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Debt Summary</Text>
                                        <Image source = { chooseExpandView === List.DEBT_SUMMARY ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            {/* <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Income = $100,000 / yr.</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Estimated Pay-off = $978.45</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    <Badge status="success"/>
                                                    <Text style={styles.listText}>Vehicle Equity = $2,500</Text>
                                                </View>
                                            </View> */}
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}>Open Accounts</Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold'}}>$2,644</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.DEBT_SUMMARY && this.renderView(List.DEBT_SUMMARY) }
                        </View>
           {/* ------------------------------ item 09-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.ESTATE_LOAN)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="home" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Real Estate Loan</Text>
                                        <Image source = { chooseExpandView === List.ESTATE_LOAN ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>Total Balance - $316,407</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>10% paid off</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>1 real estate loan</Text>
                                                </View>
                                            </View>
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}></Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold',marginTop:-40}}>$316,407</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.ESTATE_LOAN && this.renderView(List.ESTATE_LOAN) }
                        </View>

                         {/* ------------------------------ item 10-------------------------------------- */}
                         <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.STUDENT_LOAN)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="home" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Student Loan</Text>
                                        <Image source = { chooseExpandView === List.STUDENT_LOAN ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>Total Balance - $34,000</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>35% paid off</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>3 student loans</Text>
                                                </View>
                                            </View>
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}></Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold',marginTop:-40}}>$34,000</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.STUDENT_LOAN && this.renderView(List.STUDENT_LOAN) }
                        </View>

                    {/* ------------------------------ item 11-------------------------------------- */}
                        <View style={styles.accodionBlock}>
                            <TouchableWithoutFeedback  onPress={() => this.expand(List.CREDIT_CL)} >
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Icon name="credit-card-alt" size={25}  size={24} color={colors.GREY_BLUE} style={styles.titleIcon}/>
                                        <Text style={styles.title}>Credit Card and Credit Line</Text>
                                        <Image source = { chooseExpandView === List.CREDIT_CL ? UP_ARROW_ICON :  DOWN_ARROW_ICON} style={styles.image} />
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
                                            <View style={{flex:1}}>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>Total Balance - $18,700</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>35% paid off</Text>
                                                </View>
                                                <View style={{flexDirection: 'row',marginBottom:5}}>
                                                    {/* <Badge status="success"/> */}
                                                    <Text style={styles.listText}>9 loans</Text>
                                                </View>
                                            </View>
                                            <View style={{flex:1, justifyContent:'center',paddingBottom:5}} >
                                                <Text style={{alignSelf:'flex-start',fontSize:12, color:'#0D8FC9',marginBottom:-15}}></Text>
                                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#0D8FC9',fontWeight:'bold',marginTop:-40}}>$18,700</Text>
                                            </View>
                                        </View>
                                    {/* end summery */}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            { chooseExpandView === List.CREDIT_CL && this.renderView(List.CREDIT_CL) }
                        </View>
                    </ScrollView>
                </View> 
        )
    }
}

CollapsItem.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    listText :{
        fontSize:12,
        color:'#616872',
        padding:5,
        marginTop:-10,
        letterSpacing:0.5
    },
    accodionBlock: {
        backgroundColor:'#FFF',
        borderRadius:10,
        borderWidth:0,
        borderColor: '#ddd',
        marginBottom:5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding:5
    },
    summaryContainer : {
        borderColor:'#ccc',
        borderWidth:0,
        width: Dimensions.get('screen').width - 80,
        marginLeft:50
    },
    titleIcon :{
        padding:5,
        marginRight:5,
    },
    description: {
        // flex:1,
        fontSize:12,
        color:'gray',
        padding:10,
        borderColor:'#EFF0F1',
        borderTopWidth:1,
        borderTopEndRadius:5
    },
    image: {
        width: 14,
        height: 10,
        margin:5
    },
    title: {
        flex: 1,
        fontSize: 14,
        color:'#0D8FC9',
        fontWeight:'bold',
        paddingTop:5,
    }
})

export { CollapsItem };