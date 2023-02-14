import { Box, useRadio, useRadioGroup, HStack } from '@chakra-ui/react';
import { useContext } from 'react';

import { FilteredUsersDispatchContext } from '../pages/Home';

const TrackRadio = () => {
  const { setSelectedTrack, setHasMore, setPageNum, setUsers } = useContext(
    FilteredUsersDispatchContext
  );
  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          fontWeight="bold"
          borderColor="#4E6C50"
          color="#4E6C50"
          _checked={{
            bg: '#4E6C50',
            color: 'white',
            borderColor: '#4E6C50',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

  const getUsers = e => {
    setUsers([]);
    setHasMore(true);
    setPageNum(0);
    setSelectedTrack(trackOptions.indexOf(e));
  };

  const trackOptions = ['ALL', 'AI', 'IoT', 'BigData', 'BlockChain', 'Metabus'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'track',
    defaultValue: 'ALL',
    onChange: getUsers,
    // onChange: setHasMore(true),
  });

  const trackGroup = getRootProps();

  return (
    <div>
      <HStack {...trackGroup}>
        {trackOptions.map(value => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </div>
  );
};

export default TrackRadio;
