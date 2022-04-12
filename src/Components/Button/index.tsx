import * as S from './styles'

type Props = {
	label: string
	icon?: any
	onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({ label, icon, onClick }: Props) => {
	return (
		<S.Container onClick={onClick}>
			{icon && (
				<S.IconArea>
					<S.Icon src={icon} />
				</S.IconArea>
			)}
			<S.Label>{label}</S.Label>
		</S.Container>
	)
}
