import { useEffect, useState } from 'react'
import * as S from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import { InfoItem } from './Components/InfoItem'
import { Button } from './Components/Button'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from './types/GridItemType'
import { GridItem } from './Components/GridItem'
import { items } from './Data/items'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

const App = () => {
	const [playing, setPlaying] = useState<boolean>(false) /*Pra saber se o jogo já começou e rodar o Timer*/
	const [timeElapsed, setTimeElapsed] = useState<number>(0) /*Tempo que passou*/
	const [moveCount, setMoveCount] = useState<number>(0) /*Número de movimentos*/
	const [shownCount, setShownCount] = useState<number>(0) /* Cartas exibidas na jogada (max. 2)*/
	const [gridItems, setGridItems] = useState<GridItemType[]>([]) /*Lista dos Itens do Grid*/

	useEffect(() => {
		ResetGame()
	}, [])

	/* Contador de tempo*/
	useEffect(() => {
		const timer = setInterval(() => {
			if (playing) {
				setTimeElapsed(timeElapsed + 1)
			}
		}, 1000)
		return () => clearInterval(timer)
	}, [playing, timeElapsed])

	/*Verifica se as cartas viradas são iguais*/
	useEffect(() => {
		if (shownCount === 2) {
			let opened = gridItems.filter((item) => item.shown === true)
			if (opened.length === 2) {
				if (opened[0].item === opened[1].item) {
					/*Verificação 1 - verifica se as cartas são iguais, se forem, ficam permanentes*/
					let tempGrid = [...gridItems]
					for (let i in tempGrid) {
						if (tempGrid[i].shown) {
							tempGrid[i].permanentShown = true
							tempGrid[i].shown = false
						}
					}
					setGridItems(tempGrid)
					setShownCount(0)
				} else {
					/*Verificação 2 - se as cartas não forem iguais, as cartas voltam ao estado inicial após 1seg*/
					setTimeout(() => {
						let tempGrid = [...gridItems]
						for (let i in tempGrid) {
							if (tempGrid[i].shown) {
								tempGrid[i].shown = false
							}
						}
						setGridItems(tempGrid)
						setShownCount(0)
					}, 1000)
				}

				setMoveCount((moveCount) => moveCount + 1)
			}
		}
	}, [shownCount, gridItems])

	useEffect(() => {
		if (moveCount > 0 && gridItems.every((item) => item.permanentShown === true)) {
			setPlaying(false)
		}
	}, [moveCount, gridItems])

	const ResetGame = () => {
		/*Passo 1 - reset do jogo - aqui o grid é criado sem nada (imgs, tempo, etc) */
		setTimeElapsed(0)
		setMoveCount(0)
		setShownCount(0)
		/*Passo 2 - criação do grid*/
		let tempGrid: GridItemType[] = []
		for (let i = 0; i < items.length * 2; i++) {
			tempGrid.push({
				item: null,
				shown: false,
				permanentShown: false,
			})
		}
		/*Passo 2.1 - preenchimento do grid*/
		for (let W = 0; W < 2; W++) {
			for (let i = 0; i < items.length; i++) {
				let pos = -1
				while (pos < 0 || tempGrid[pos].item !== null) {
					pos = Math.floor(Math.random() * (items.length * 2))
				}
				tempGrid[pos].item = i
			}
		} /*O While é para gerar um numero diferente da carta que já está virada, 
			pra n dar um bug e dar um Acerto quando na verdade o player errou*/

		/*Passo 2.2 - jogar para o State - items vão ser exibidos*/
		setGridItems(tempGrid)

		/*Passo 3 - Inicio do jogo*/
		setPlaying(true)
	}

	/*Inicio da lógica do jogo*/
	const handleClick = (index: number) => {
		/*Verifica se tem menos de 2 cartas viradas, para não poder virar mais*/
		if (playing && index !== null && shownCount < 2) {
			let tempGrid = [...gridItems]
			/*Caso exiba uma carta, deixa ela virada(antes da verificação do acerto)*/
			if (tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
				tempGrid[index].shown = true
				setShownCount(shownCount + 1)
			}
			setGridItems(tempGrid)
		}
	}

	return (
		<S.Container>
			<S.Info>
				<S.LogoLink href=''>
					<img src={logoImage} width='300' alt='' />
				</S.LogoLink>
				<S.InfoArea>
					<InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
					<InfoItem label='Movimentos' value={moveCount.toString()} />
				</S.InfoArea>

				<Button label='Reiniciar' icon={RestartIcon} onClick={ResetGame} />
			</S.Info>
			<S.GridArea>
				<S.Grid>
					{gridItems.map((item, index) => (
						<GridItem key={index} item={item} onClick={() => handleClick(index)} />
					))}
				</S.Grid>
			</S.GridArea>
		</S.Container>
	)
}

export default App
