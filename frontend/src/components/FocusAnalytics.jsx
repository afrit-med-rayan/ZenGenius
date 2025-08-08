// FocusAnalytics.jsx - Focus trends and insights component
import React, { useMemo } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Badge,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';

const FocusAnalytics = ({ sessions = [] }) => {
  const focusAnalytics = useMemo(() => {
    if (!sessions.length) return null;

    const focusLevels = sessions.map(s => s.focus || 0).filter(f => f > 0);
    if (!focusLevels.length) return null;

    const avgFocus = focusLevels.reduce((a, b) => a + b, 0) / focusLevels.length;
    const maxFocus = Math.max(...focusLevels);
    const minFocus = Math.min(...focusLevels);
    
    // Get last 7 days of sessions
    const last7Days = sessions
      .filter(s => new Date(s.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const recentAvg = last7Days.length > 0 
      ? last7Days.reduce((sum, s) => sum + (s.focus || 0), 0) / last7Days.length 
      : avgFocus;

    // Focus distribution
    const distribution = {
      low: focusLevels.filter(f => f <= 3).length,
      medium: focusLevels.filter(f => f >= 4 && f <= 6).length,
      high: focusLevels.filter(f => f >= 7).length,
    };

    // Best focus time analysis
    const timeAnalysis = sessions.reduce((acc, session) => {
      const hour = new Date(session.date).getHours();
      const timeSlot = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
      
      if (!acc[timeSlot]) acc[timeSlot] = { total: 0, count: 0 };
      acc[timeSlot].total += session.focus || 0;
      acc[timeSlot].count += 1;
      
      return acc;
    }, {});

    const bestTime = Object.entries(timeAnalysis)
      .map(([time, data]) => ({ time, avg: data.total / data.count }))
      .sort((a, b) => b.avg - a.avg)[0];

    return {
      avgFocus: avgFocus.toFixed(1),
      maxFocus,
      minFocus,
      recentAvg: recentAvg.toFixed(1),
      trend: recentAvg > avgFocus ? 'increase' : recentAvg < avgFocus ? 'decrease' : 'stable',
      distribution,
      bestTime: bestTime?.time || 'morning',
      totalSessions: focusLevels.length,
    };
  }, [sessions]);

  if (!focusAnalytics) {
    return (
      <Card>
        <CardHeader>
          <Heading size="md">🧠 Focus Analytics</Heading>
        </CardHeader>
        <CardBody>
          <Text color="gray.500">No focus data available yet. Start tracking your focus levels!</Text>
        </CardBody>
      </Card>
    );
  }

  const getFocusColor = (level) => {
    if (level <= 3) return 'red';
    if (level <= 6) return 'yellow';
    return 'green';
  };

  const getFocusLabel = (level) => {
    if (level <= 3) return 'Needs Improvement';
    if (level <= 6) return 'Good';
    return 'Excellent';
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">🧠 Focus Analytics</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          {/* Overall Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Stat>
              <StatLabel>Average Focus</StatLabel>
              <StatNumber color={`${getFocusColor(focusAnalytics.avgFocus)}.500`}>
                {focusAnalytics.avgFocus}/10
              </StatNumber>
              <StatHelpText>
                <Badge colorScheme={getFocusColor(focusAnalytics.avgFocus)}>
                  {getFocusLabel(focusAnalytics.avgFocus)}
                </Badge>
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Recent Trend</StatLabel>
              <StatNumber>{focusAnalytics.recentAvg}/10</StatNumber>
              <StatHelpText>
                <StatArrow type={focusAnalytics.trend === 'increase' ? 'increase' : 'decrease'} />
                {focusAnalytics.trend === 'increase' ? 'Improving' : 
                 focusAnalytics.trend === 'decrease' ? 'Declining' : 'Stable'}
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Best Focus</StatLabel>
              <StatNumber color="green.500">{focusAnalytics.maxFocus}/10</StatNumber>
              <StatHelpText>Peak performance</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Sessions</StatLabel>
              <StatNumber>{focusAnalytics.totalSessions}</StatNumber>
              <StatHelpText>Total tracked</StatHelpText>
            </Stat>
          </SimpleGrid>

          {/* Focus Distribution */}
          <Box>
            <Text fontWeight="semibold" mb={3}>Focus Level Distribution</Text>
            <VStack spacing={2}>
              <HStack w="full" justify="space-between">
                <Text fontSize="sm">Low Focus (1-3)</Text>
                <Text fontSize="sm">{focusAnalytics.distribution.low} sessions</Text>
              </HStack>
              <Progress 
                value={(focusAnalytics.distribution.low / focusAnalytics.totalSessions) * 100} 
                colorScheme="red" 
                w="full" 
                size="sm"
              />

              <HStack w="full" justify="space-between">
                <Text fontSize="sm">Medium Focus (4-6)</Text>
                <Text fontSize="sm">{focusAnalytics.distribution.medium} sessions</Text>
              </HStack>
              <Progress 
                value={(focusAnalytics.distribution.medium / focusAnalytics.totalSessions) * 100} 
                colorScheme="yellow" 
                w="full" 
                size="sm"
              />

              <HStack w="full" justify="space-between">
                <Text fontSize="sm">High Focus (7-10)</Text>
                <Text fontSize="sm">{focusAnalytics.distribution.high} sessions</Text>
              </HStack>
              <Progress 
                value={(focusAnalytics.distribution.high / focusAnalytics.totalSessions) * 100} 
                colorScheme="green" 
                w="full" 
                size="sm"
              />
            </VStack>
          </Box>

          {/* Insights */}
          <Box bg="blue.50" p={4} rounded="lg" border="1px solid" borderColor="blue.200">
            <Text fontWeight="semibold" color="blue.700" mb={2}>💡 Insights</Text>
            <VStack align="start" spacing={1} fontSize="sm" color="blue.600">
              <Text>• Your best focus time is in the {focusAnalytics.bestTime}</Text>
              <Text>
                • You have {focusAnalytics.distribution.high} high-focus sessions 
                ({((focusAnalytics.distribution.high / focusAnalytics.totalSessions) * 100).toFixed(0)}% of total)
              </Text>
              {focusAnalytics.trend === 'increase' && (
                <Text>• Your focus is improving! Keep up the good work! 🎉</Text>
              )}
              {focusAnalytics.trend === 'decrease' && (
                <Text>• Consider taking more breaks or adjusting your study environment</Text>
              )}
              {focusAnalytics.avgFocus < 5 && (
                <Text>• Try studying during your peak focus time ({focusAnalytics.bestTime}) for better results</Text>
              )}
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default FocusAnalytics;