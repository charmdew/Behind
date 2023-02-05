import { Box, useRadio, useRadioGroup, HStack } from '@chakra-ui/react';
import { useContext } from 'react';

import { FilteredUsersDispatchContext } from '../pages/Home';

const TrackRadio = () => {
  const { setSelectedTrack } = useContext(FilteredUsersDispatchContext);
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
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
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
    setSelectedTrack(trackOptions.indexOf(e));
  };

  const trackOptions = [
    '전체',
    'AI',
    'IoT',
    'BigData',
    'BlockChain',
    'Metabus',
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'track',
    defaultValue: '전체',
    onChange: getUsers,
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
