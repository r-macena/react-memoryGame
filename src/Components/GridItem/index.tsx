import { GridItemType } from '../../types/GridItemType'
import * as S from './styles'
import b7svg from '../../svgs/b7.svg'
import { items } from '../../Data/items'

type Props = {
	item: GridItemType
	onClick: () => void
}
export const GridItem = ({ item, onClick }: Props) => {
	return (
		/*A verificação do item null no item.item !== null é para não dar erro na verificação do item, que pode ser null ou number. 
		Mesmo que no App.tsx ele comece como null, a verificação tá aí pra dar a ctz.*/
		<S.Container onClick={onClick} showBackground={item.permanentShown === true || item.shown}>
			{item.permanentShown === false && item.shown === false && <S.Icon src={b7svg} alt='b7' opacity={0.5} />}
			{(item.permanentShown === true || item.shown) === true && item.item !== null && (
				<S.Icon src={items[item.item].icon} alt='' />
			)}
		</S.Container>
	)
}
