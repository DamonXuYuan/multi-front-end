import React from 'react'
import { Flex, VStack, Icon, Text, Box, useToast } from '@chakra-ui/react'
import { Home, LockIcon, User, Shuffle } from 'lucide-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type NavItem = {
  icon: React.ComponentType
  label: string
  url: string
  isActive: boolean
}

type BottomNavbarProps = {
  items: NavItem[]
  onItemClick: (item: NavItem, index: number) => void
}

const BottomNavbar = ({ items, onItemClick }: BottomNavbarProps) => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
    >
      <Flex justify="space-around" py={2}>
        {items.map((item, index) => (
          <VStack
            key={index}
            spacing={1}
            onClick={() => onItemClick(item, index)}
            cursor="pointer"
            color={item.isActive ? 'black' : 'gray.500'}
            transition="color 0.2s"
          >
            <Icon as={item.icon} boxSize={6} />
            <Text fontSize="xs">{item.label}</Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  )
}

const TabBar: React.FC = () => {
  const { t } = useTranslation(['home'])
  const toast = useToast()
  const [activeIndex, setActiveIndex] = React.useState(0)
  const router = useRouter()
  const navItems: NavItem[] = [
    { icon: Home, url: '/', label: '首页', isActive: activeIndex === 0 },
    { icon: Shuffle, url: '', label: '抽签', isActive: activeIndex === 1 },
    { icon: LockIcon, url: '', label: '质押', isActive: activeIndex === 2 },
    { icon: User, url: '/user', label: '我的', isActive: activeIndex === 3 },
  ]

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index)
    if (item.url === '') {
      toast({
        // title: '功能开发中',
        title: t('featureInDevelopment'),
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
      window.open(item.url, '_blank')
    } else {
      router.push(item.url)
    }
  }
  return <BottomNavbar items={navItems} onItemClick={handleItemClick} />
}

export default TabBar
