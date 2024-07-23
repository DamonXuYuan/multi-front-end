import React, { useState } from 'react'
import { Text, Flex, Image, Input, InputProps, useInterval } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import hideIcon from '@/assets/imgs/hideIcon.png'

interface IProps extends InputProps {
  captcha?: boolean
  password?: boolean
}

function Index({ captcha, password, ...props }: IProps) {
  const { t } = useTranslation(['home'])
  const [showPSD, setShowPSD] = useState(false)
  const [count, setCount] = useState(60)
  const [isCounting, setIsCounting] = useState(false)

  useInterval(
    () => {
      if (count > 0) {
        setCount(count - 1)
      } else {
        setIsCounting(false)
        setCount(60)
      }
    },
    isCounting ? 1000 : null
  )

  return (
    <Flex pos="relative" alignItems="center">
      <Input
        w="full"
        h="48px"
        bgColor="white.100"
        color="black.200"
        fontSize="16px"
        lineHeight="24px"
        borderRadius="0"
        border="none"
        borderBottom="1px solid"
        borderColor="gray.100"
        p="0"
        type={password ? (showPSD ? 'text' : 'password') : 'text'}
        _hover={{
          borderColor: 'gray.100',
        }}
        _focusVisible={{
          borderColor: 'gray.100',
        }}
        _placeholder={{
          color: 'gray.200',
          fontsize: '16px',
        }}
        {...props}
      />
      {captcha && (
        <Text
          color="green.100"
          fontSize="16px"
          lineHeight="24px"
          pos="absolute"
          top="13px"
          right="0"
          onClick={() => !isCounting && setIsCounting(true)}
        >
          {!isCounting ? (t('captchaButton') as string) : `${count}s`}
        </Text>
      )}
      {password && (
        <Image
          src={showPSD ? hideIcon : hideIcon}
          w="16px"
          h="16px"
          pos="absolute"
          top="13px"
          right="0"
          onClick={() => setShowPSD(!showPSD)}
        />
      )}
    </Flex>
  )
}

export default React.memo(Index)
