// sessionService.js - Real data fetching for dashboard
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const sessionService = {
  // Get all sessions for a user
  async getUserSessions(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/study-session/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      throw error;
    }
  },

  // Get today's sessions
  async getTodaySessions(userId) {
    try {
      const sessions = await this.getUserSessions(userId);
      const today = new Date().toDateString();
      return sessions.filter(session => 
        new Date(session.date).toDateString() === today
      );
    } catch (error) {
      console.error('Error fetching today sessions:', error);
      return [];
    }
  },

  // Calculate study statistics
  calculateStats(sessions) {
    if (!sessions || sessions.length === 0) {
      return {
        totalSessions: 0,
        totalStudyTime: 0,
        averageFocus: 0,
        totalFlashcards: 0,
        todaySessions: 0,
        weeklyAverage: 0,
        focusTrend: 'stable'
      };
    }

    const totalSessions = sessions.length;
    const totalFlashcards = sessions.reduce((sum, session) => {
      if (session.flashcards) {
        const flashcardCount = (session.flashcards.match(/Q:/g) || []).length;
        return sum + flashcardCount;
      }
      return sum;
    }, 0);

    const focusLevels = sessions
      .map(s => s.focus || 0)
      .filter(f => f > 0);
    
    const averageFocus = focusLevels.length > 0 
      ? focusLevels.reduce((a, b) => a + b, 0) / focusLevels.length 
      : 0;

    // Calculate today's sessions
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(session => 
      new Date(session.date).toDateString() === today
    ).length;

    // Calculate weekly average (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekSessions = sessions.filter(session => 
      new Date(session.date) >= weekAgo
    );
    const weeklyAverage = weekSessions.length / 7;

    // Calculate focus trend (last 5 sessions vs previous 5)
    const recentSessions = sessions.slice(-5);
    const previousSessions = sessions.slice(-10, -5);
    
    const recentFocus = recentSessions.reduce((sum, s) => sum + (s.focus || 0), 0) / recentSessions.length;
    const previousFocus = previousSessions.length > 0 
      ? previousSessions.reduce((sum, s) => sum + (s.focus || 0), 0) / previousSessions.length 
      : recentFocus;

    let focusTrend = 'stable';
    if (recentFocus > previousFocus + 0.5) focusTrend = 'improving';
    else if (recentFocus < previousFocus - 0.5) focusTrend = 'declining';

    // Estimate study time (assume 30 minutes per session on average)
    const totalStudyTime = totalSessions * 0.5; // hours

    return {
      totalSessions,
      totalStudyTime,
      averageFocus: Number(averageFocus.toFixed(1)),
      totalFlashcards,
      todaySessions,
      weeklyAverage: Number(weeklyAverage.toFixed(1)),
      focusTrend
    };
  },

  // Get mood distribution
  getMoodDistribution(sessions) {
    const moodCounts = sessions.reduce((acc, session) => {
      const mood = session.mood || 'Unknown';
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    return moodCounts;
  },

  // Get best study time
  getBestStudyTime(sessions) {
    const timeSlots = sessions.reduce((acc, session) => {
      const hour = new Date(session.date).getHours();
      let timeSlot;
      
      if (hour >= 6 && hour < 12) timeSlot = 'Morning';
      else if (hour >= 12 && hour < 17) timeSlot = 'Afternoon';
      else if (hour >= 17 && hour < 22) timeSlot = 'Evening';
      else timeSlot = 'Night';

      if (!acc[timeSlot]) acc[timeSlot] = { count: 0, totalFocus: 0 };
      acc[timeSlot].count += 1;
      acc[timeSlot].totalFocus += session.focus || 0;
      
      return acc;
    }, {});

    let bestTime = 'Morning';
    let bestAverage = 0;

    Object.entries(timeSlots).forEach(([time, data]) => {
      const average = data.totalFocus / data.count;
      if (average > bestAverage) {
        bestAverage = average;
        bestTime = time;
      }
    });

    return { time: bestTime, average: bestAverage.toFixed(1) };
  }
};