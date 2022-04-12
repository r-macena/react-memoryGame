import * as S from './styles'

type Props = {
	label: string
	value: string
}

export const InfoItem = ({ label, value }: Props) => {
	return (
		<S.Container>
			<S.Label>{label}</S.Label>
			<S.Value>{value}</S.Value>
		</S.Container>
	)
}
