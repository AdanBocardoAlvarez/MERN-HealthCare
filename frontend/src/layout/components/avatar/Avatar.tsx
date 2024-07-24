import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons/lib';

type AvatarProps = { img: string; onChange?: () => void };

const ChangeAvatar = ({ img, onChange }: AvatarProps) => (
	<div className='d-flex align-items-center'>
		<Avatar src={img as string} size={100} className='mr-5' alt='Avatar Image' />
		<Button onClick={onChange} icon={<UserOutlined />} type='primary'>
			Change photo
		</Button>
	</div>
);

export default ChangeAvatar;
