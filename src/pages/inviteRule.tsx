import React from 'react'
import { Box, Text, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
const BoxPage = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="white" minHeight="100vh">
      <Navbar title="活动规则" isFixed={true} leftContent={<ChevronLeft onClick={handleBack} />} />
      <Stack p="12px">
        <Heading size="md">一、活动时间</Heading>
        <Text>【邀请好友赚5元】活动周期：长期有效</Text>
        <Heading size="md">二、如何参加</Heading>
        <Text>1、邀请好友</Text>
        <Text>在邀请赚活动页面，点击【立即邀请】分享海报或链接给你的好友。</Text>
        <Text>2、邀请成功最高可得500积分，即最高抵现5元。</Text>
        <Text>
          当被邀请好友成功注册并使用羊小咩APP时，您最高可获得500积分奖励，即每邀请1人最高可得5元抵现，上不封顶。
        </Text>
        <Heading size="md">三、如何抵现</Heading>
        <Text>
          被邀请好友每完成一项任务，邀请人即可获得相应任务的对应积分，积分满100即可抵现，100积分可抵1元；抵现时，积分必须是100的整数倍，如200、300、500等。
        </Text>
        <Heading size="md">四、注意事项</Heading>
        <Text>1、恶意刷单等作弊行为将被取消活动资格并取消积分；</Text>
        <Text>2、每日邀请好友上限为1000次；</Text>
        <Text>3、本活动最终解释权归【元宇宙】所有。</Text>
      </Stack>
    </Box>
  )
}

export default BoxPage
