// 로그인한 나에 대한 정보는 App.js에서 보관

import { useContext } from 'react';
import { UsersStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

import {
  IconButton,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { FiArrowLeft } from 'react-icons/fi';

const MyPage = () => {
  const { loginUser } = useContext(UsersStateContext);
  const navigate = useNavigate();

  const position = () => {
    const temp = [];
    if (loginUser.position.frontend) {
      temp.push('frontend');
    }
    if (loginUser.position.backend) {
      temp.push('backend');
    }
    if (loginUser.position.embeded) {
      temp.push('embeded');
    }
    return temp;
  };

  const track = () => {
    const temp = [];
    if (loginUser.track.ai) {
      temp.push('ai');
    }
    if (loginUser.track.bigdata) {
      temp.push('bigdata');
    }
    if (loginUser.track.iot) {
      temp.push('iot');
    }
    if (loginUser.track.blockchain) {
      temp.push('blockchain');
    }
    return temp;
  };

  return (
    <div>
      <Box alignItems="center" display="flex" w="100%" bg="gray.100">
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
          size="lg"
          icon={<FiArrowLeft />}
        />
        <Text as="b">My Page</Text>
      </Box>

      <Box>
        <Text>이름</Text>
        <Text>{loginUser.name}</Text>
        <Text>태그</Text>
        <Text>{`#${loginUser.tag.join(' #')}`}</Text>
        <Text>email</Text>
        <Text>{loginUser.email}</Text>
        <Text>phone</Text>
        <Text>{loginUser.phoneNum}</Text>
        <Text>선호포지션</Text>
        <Text>{position()}</Text>
        <Text>선호트랙</Text>
        <Text>{track()}</Text>
        <Text>상세</Text>
        <Text>{loginUser.detail}</Text>
      </Box>

      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
        >
          User Setting <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate('/useredit');
            }}
          >
            회원정보수정
          </MenuItem>
          <MenuDivider />
          <MenuItem>로그아웃</MenuItem>
          <MenuDivider />
          <MenuItem>회원탈퇴</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default MyPage;
