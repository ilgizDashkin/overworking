import React, { Component } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Panel, PanelHeader, FormLayout, Button, Input, CardGrid, Card} from '@vkontakte/vkui';//пакеты из вк
// import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';//это из https://vkcom.github.io/icons/#24/smile
// import Icon24Send from '@vkontakte/icons/dist/24/send';
// import Icon24Smile from '@vkontakte/icons/dist/24/smile';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './App.css'
import Icon28StatisticsOutline from '@vkontakte/icons/dist/28/statistics_outline';
// import Icon24Forward10 from '@vkontakte/icons/dist/24/forward_10';
// import AnyChart from 'anychart-react'
// import iconv from 'iconv-lite'
// import Parser from 'rss-parser'


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oklad: '25000',
			hour: '4',
			calc: null,
		}
	}

	componentDidMount() {
		//вызываем предыдущее состояние из локалсториджа
		const lastState = localStorage.overworking
		if (lastState) {
			// console.log(lastState)
			this.setState(JSON.parse(lastState))
		}
	}

	//обязательно используем стрелочные фунции чтоб не прописывать методы в конструкторе
	okladChange = (event) => {
		this.setState({ oklad: Number(event.target.value) });
	}
	hourChange = (event) => {
		this.setState({ hour: Number(event.target.value) });
	}
	onClickHandler = () => {
		if (Number(this.state.oklad) && Number(this.state.hour)) {
			let priceWork =(this.state.oklad*1.33/22/8).toFixed(2); 
			let totalMoney=(priceWork*this.state.hour).toFixed(2);
			let propab=0
			if (this.state.hour<=4){
				
				propab=0.95
			}else if((this.state.hour>4)&&(this.state.hour<=6)){
				totalMoney=(totalMoney-priceWork*0.5).toFixed(2);
				propab=0.65
			}
			else if((this.state.hour>6)&&(this.state.hour<=7)){
				totalMoney=(totalMoney-priceWork*0.5).toFixed(2);
				propab=0.25
			}else{
				totalMoney=(totalMoney-priceWork*0.5).toFixed(2);
				propab=0.1
			}
			this.setState({
				calc: `Оплата за час ${priceWork}р. Если больше 4часов вычитается обед 30мин. Самое вероятный исход за 5 переработок по ${this.state.hour} часов равно ${((totalMoney)*propab * 5).toFixed(2)}р. 
				Шансы получит ${(totalMoney*5).toFixed(2)}р. за все переработки  ${(Math.pow(propab,5)*100).toFixed(4)}%, это если Исус тебя любит! 
				Шансы соснуть и отправится в отгул за все переработки  ${(Math.pow((1-propab),5)*100).toFixed(4)}%.`
			})
			localStorage.overworking = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
		

		} else {
			this.setState({
				oklad: '',
			hour: '',
			calc: null,
			})
		}
	}
	
	
	render() {
		return (
			<View id="view" activePanel="panel">
				<Panel id="panel">
					<PanelHeader>за 5 переработок в месяц</PanelHeader>
						<FormLayout align="center">
							
							<Input type="number" top="оклад"  align="center" value={this.state.oklad} onChange={this.okladChange} />
							<Input type="number" top="часы переработки за один выход"  align="center" value={this.state.hour} onChange={this.hourChange} />
								<Button onClick={this.onClickHandler} before={<Icon28StatisticsOutline />} size="l">вычислить</Button>
							{this.state.calc ?
								<CardGrid>
									<Card size="l" mode="outline">
									{this.state.calc }
									</Card>
								</CardGrid> : null}
						
					
						</FormLayout>
				
				</Panel>
			</View>
		);
	}
}

export default App;

