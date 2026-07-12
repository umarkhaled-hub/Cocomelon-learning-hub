// Parent Analytics JavaScript

function loadParentAnalytics() {
  const saved = localStorage.getItem('cocomeLonStudentData');
  if (saved) {
    const data = JSON.parse(saved);
    updateParentDashboard(data);
  }
}

function updateParentDashboard(data) {
  // Update summary cards
  document.getElementById('parentTotalPoints').textContent = data.totalPoints || 0;
  document.getElementById('parentLessonsCount').textContent = data.totalLessons || 0;
  document.getElementById('parentAchievementsCount').textContent = data.earnedAchievements.length || 0;
  document.getElementById('parentStreakCount').textContent = data.streak || 0;

  // Get lesson data
  const lessonsData = localStorage.getItem('cocomeLonLessons');
  if (lessonsData) {
    const lessons = JSON.parse(lessonsData);
    updateProgressCharts(lessons);
    updateInsights(lessons, data);
  }

  // Update achievements
  updateAchievementsDisplay(data);
  updateRecommendations(data);
}

function updateProgressCharts(lessons) {
  const topics = [
    { key: 'alphabet', id: 'alphabet' },
    { key: 'numbers', id: 'numbers' },
    { key: 'animals', id: 'animals' },
    { key: 'colors', id: 'colors' },
    { key: 'emotions', id: 'emotions' },
    { key: 'family', id: 'family' }
  ];

  topics.forEach(topic => {
    const lesson = lessons[topic.key];
    if (lesson) {
      const percentage = (lesson.completed / lesson.total) * 100;
      document.getElementById(`chart-${topic.id}`).style.width = percentage + '%';
      document.getElementById(`chart-${topic.id}-text`).textContent = `${lesson.completed}/${lesson.total}`;
    }
  });
}

function updateInsights(lessons, data) {
  // Find strongest topic
  let strongest = { name: 'N/A', completed: 0 };
  let needsFocus = { name: 'N/A', completed: 10 };

  Object.values(lessons).forEach(lesson => {
    if (lesson.completed > strongest.completed) {
      strongest = { name: lesson.name, completed: lesson.completed };
    }
    if (lesson.completed < needsFocus.completed) {
      needsFocus = { name: lesson.name, completed: lesson.completed };
    }
  });

  document.getElementById('strongestTopic').textContent = strongest.name;
  document.getElementById('focusArea').textContent = needsFocus.name;
  document.getElementById('dailyAverage').textContent = Math.round((data.totalPoints || 0) / 5) + ' min';
  
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
  const level = Math.floor((data.level || 1) / 1) - 1;
  document.getElementById('learningLevel').textContent = levels[Math.min(level, levels.length - 1)];
}

function updateAchievementsDisplay(data) {
  const achievements = [
    { id: 1, icon: '🌟', name: 'First Steps' },
    { id: 2, icon: '📚', name: 'Reader' },
    { id: 3, icon: '🏆', name: 'Master' },
    { id: 4, icon: '⭐', name: 'Star Student' },
    { id: 5, icon: '🔥', name: 'On Fire' },
    { id: 6, icon: '🎓', name: 'Scholar' },
    { id: 7, icon: '💯', name: 'Perfect Score' },
    { id: 8, icon: '����', name: 'Rainbow Learner' }
  ];

  const grid = document.getElementById('parentAchievements');
  grid.innerHTML = '';

  achievements.forEach(achievement => {
    const earned = data.earnedAchievements && data.earnedAchievements.includes(achievement.id);
    const div = document.createElement('div');
    div.className = `achievement-item ${!earned ? 'locked' : ''}`;
    div.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-title">${achievement.name}</div>
    `;
    grid.appendChild(div);
  });
}

function updateRecommendations(data) {
  const recommendations = [];

  if ((data.totalLessons || 0) < 5) {
    recommendations.push({
      title: '🎯 Start Learning',
      text: 'Your child is just starting their learning journey. Encourage daily practice for better results!'
    });
  }

  if ((data.streak || 0) < 3) {
    recommendations.push({
      title: '🔥 Build a Streak',
      text: 'Consistency is key! Try to complete lessons daily to build a streak and earn more points.'
    });
  }

  if ((data.earnedAchievements || []).length < 3) {
    recommendations.push({
      title: '🏅 Unlock Achievements',
      text: 'Challenge your child to complete different topics to unlock more achievements!'
    });
  }

  if ((data.totalPoints || 0) >= 50) {
    recommendations.push({
      title: '🎁 Redeem Rewards',
      text: 'Your child has earned enough points! Visit the Rewards Store to redeem prizes.'
    });
  }

  recommendations.push({
    title: '💬 Celebrate Progress',
    text: 'Praise your child for their efforts. Learning is a journey, not a destination!'
  });

  const list = document.getElementById('recommendationList');
  list.innerHTML = '';

  recommendations.forEach(rec => {
    const div = document.createElement('div');
    div.className = 'recommendation-item';
    div.innerHTML = `<h4>${rec.title}</h4><p>${rec.text}</p>`;
    list.appendChild(div);
  });
}

function selectChild(childId) {
  document.querySelectorAll('.child-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  loadParentAnalytics();
}

function addChild() {
  alert('📱 Multi-child feature coming soon! Subscribe to get this feature.');
}

function exportPDF() {
  alert('📄 PDF export feature coming soon!');
}

function shareProgress() {
  const email = prompt('Enter parent email to share progress:');
  if (email) {
    alert(`✅ Progress report will be sent to ${email}`);
  }
}

function printReport() {
  window.print();
}

// Load on page load
window.addEventListener('load', loadParentAnalytics);

console.log('📊 Parent Analytics Dashboard loaded!');
