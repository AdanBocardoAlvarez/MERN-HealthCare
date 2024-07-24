import Classes from './Avatar.module.scss';

type Props = {
	img: string;
	size: 'sm' | 'md' | 'lg' | 'xl';
	alt: string
};

const Avatar = ({ img, size = 'md', alt }: Props) => (
	<div className={`${Classes.avatarBlock} avatar=${size} mr-5`}>
		<img src={img as string} alt={`${alt} user photo`} />
	</div>
);

export default Avatar;
