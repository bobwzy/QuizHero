import React from 'react';
import ReactEcharts from 'echarts-for-react';


class QuizStatistic extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        // const {chartData} = this.props;
        // const charData = [];
        // const myChartData = chartData.details?chartData.details.dtl:[];
        // const categories = [], roArray = [], shfArray = [], avgArray = [];

        // myChartData.map((item)=>{
        //     const roNum = parseFloat(item.RO_COUNT);
        //     const shfNum = parseFloat(item.SHF_COUNT);
        //     const avgNum = parseFloat(item.AVG_VAL);

        //     categories.push(item.MECHANIC_NAME);
        //     roArray.push(roNum);
        //     shfArray.push(shfNum);
        //     avgArray.push(avgNum);
        // });

       

        const echartOption = {
            title: { text: 'Quiz Statistic',
                  x:'center'},

            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'},
            },
            legend: {
                data:['台次','钣面数','平均(面/天)'],
                x:'left'
            },
            xAxis: {
                name:"Answer",
                data: ["A", "B", "C", "D"],
                //data: ["技师1", "技师2", "技师3", "技师4", "技师5", "技师6"]
            },
            yAxis: {
                name:"Amount",
            },
            series: [
                {
                    name: '台次',
                    type: 'bar',
                    barGap: 0,
                    barWidth : 30,
                    data:[5, 20, 36, 10],
                    //data: [5, 20, 36, 10, 10, 20],
                    itemStyle:{
                        normal:{color:'#4cabce'}
                    }
                },
                {
                    name: '钣面数',
                    type: 'bar',
                    barWidth : 30,
                    data:[10, 22, 5, 20],
                    //data: [10, 22, 5, 20, 20, 20],
                    itemStyle:{
                        normal:{color:'#e5323e'}
                    }
                },
                {
                    name:'平均(面/天)',
                    type:'line',
                    data:[5.5, 10.2, 22, 15],
                    //data:[5.5, 10.2, 22, 15, 6.3, 10.2],
                    itemStyle:{
                        normal:{color:'#e5d930'}
                    }
                }
            ]
            // series: [
            //     {
            //         name: '台次',
            //         type: 'bar',
            //         barGap: 0,
            //         barWidth : 30,
            //         data:roArray.length!==0?roArray:[5, 20, 36, 10, 10, 20],
            //         //data: [5, 20, 36, 10, 10, 20],
            //         itemStyle:{
            //             normal:{color:'#4cabce'}
            //         }
            //     },
            //     {
            //         name: '钣面数',
            //         type: 'bar',
            //         barWidth : 30,
            //         data:shfArray.length!==0?shfArray:[10, 22, 5, 20, 20, 20],
            //         //data: [10, 22, 5, 20, 20, 20],
            //         itemStyle:{
            //             normal:{color:'#e5323e'}
            //         }
            //     },
            //     {
            //         name:'平均(面/天)',
            //         type:'line',
            //         data:avgArray.length!==0?avgArray:[5.5, 10.2, 22, 15, 6.3, 10.2],
            //         //data:[5.5, 10.2, 22, 15, 6.3, 10.2],
            //         itemStyle:{
            //             normal:{color:'#e5d930'}
            //         }
            //     }
            // ]
        };



        return (
            <ReactEcharts
                ref={(e) => {this.echartsElement = e }}
                option={echartOption}
                theme="clear"
            />
        )
    }
}

export default QuizStatistic