import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Star, Trophy, Home, Coffee } from 'lucide-react';

const LifeDashboard = () => {
  const [activeTab, setActiveTab] = useState('sanctuary');
  const [sanctuaryProgress, setSanctuaryProgress] = useState({
    label: "January Progress",
    value: 15,
    items: [
      { 
        name: "Contact fence companies", 
        completed: false,
        milestoneTrigger: null 
      },
      { 
        name: "Get fence quotes", 
        completed: false,
        milestoneTrigger: null
      },
      { 
        name: "Schedule installation", 
        completed: false,
        milestoneTrigger: "fence_installation"
      },
      { 
        name: "Complete fence funding", 
        completed: true,
        milestoneTrigger: "fence_fund"
      },
      { 
        name: "Clear bedroom space", 
        completed: false,
        milestoneTrigger: "bedroom_preparation"
      }
    ]
  });

  const [sanctuaryMilestones, setSanctuaryMilestones] = useState([
    {
      id: "fence_fund",
      title: "Fence Fund Complete",
      target: "January 2025",
      impact: "Ready to begin contractor search",
      reward: "Weekend movie marathon",
      completed: true,
      triggerProgress: ["Complete fence funding"]
    },
    {
      id: "fence_installation",
      title: "Fence Installation Scheduled",
      target: "January 12, 2025",
      impact: "Installation can be scheduled",
      reward: "Favorite takeout meal",
      completed: false,
      triggerProgress: ["Schedule installation"]
    },
    {
      id: "bedroom_preparation",
      title: "Bedroom Ready for Setup",
      target: "Late January 2025",
      impact: "Ready to start bedroom transformation",
      reward: "Order new pajamas",
      completed: false,
      triggerProgress: ["Clear bedroom space"]
    }
  ]);

  const [nutritionProgress, setNutritionProgress] = useState({
    label: "January Progress",
    value: 0,
    items: [
      { 
        name: "Week 1: At least one home-cooked meal", 
        completed: false,
        milestoneTrigger: "first_meal_prep"
      },
      { 
        name: "Week 2: At least one home-cooked meal", 
        completed: false,
        milestoneTrigger: null
      },
      { 
        name: "Week 3: At least one home-cooked meal", 
        completed: false,
        milestoneTrigger: null
      },
      { 
        name: "Week 4: At least one home-cooked meal", 
        completed: false,
        milestoneTrigger: "consistent_meals"
      },
      { 
        name: "Create supplement plan with research", 
        completed: false,
        milestoneTrigger: "supplement_plan"
      },
      { 
        name: "Schedule nutritionist consultation", 
        completed: false,
        milestoneTrigger: "nutritionist_found"
      },
      { 
        name: "Research Ozempic provider options", 
        completed: false,
        milestoneTrigger: null
      },
      { 
        name: "Contact selected Ozempic provider", 
        completed: false,
        milestoneTrigger: "ozempic_started"
      }
    ]
  });

  const [nutritionMilestones, setNutritionMilestones] = useState([
    {
      id: "first_meal_prep",
      title: "First Week of Home Cooking",
      target: "January Week 1",
      impact: "Starting the journey to better nutrition",
      reward: "New food storage containers",
      completed: false,
      triggerProgress: ["Week 1: At least one home-cooked meal"]
    },
    {
      id: "consistent_meals",
      title: "Full Month of Weekly Home Cooking",
      target: "January",
      impact: "Establishing consistent meal routine",
      reward: "New cooking appliance of choice",
      completed: false,
      triggerProgress: ["Week 4: At least one home-cooked meal"]
    },
    {
      id: "supplement_plan",
      title: "Supplement Regimen Established",
      target: "Mid-January",
      impact: "Supporting nutritional needs",
      reward: "Nice supplement organizer",
      completed: false,
      triggerProgress: ["Create supplement plan with research"]
    },
    {
      id: "nutritionist_found",
      title: "Nutritionist Partnership Started",
      target: "January",
      impact: "Professional guidance secured",
      reward: "New water bottle",
      completed: false,
      triggerProgress: ["Schedule nutritionist consultation"]
    },
    {
      id: "ozempic_started",
      title: "Ozempic Journey Begun",
      target: "January",
      impact: "Taking step toward weight management",
      reward: "Healthy cookbook",
      completed: false,
      triggerProgress: ["Contact selected Ozempic provider"]
    }
  ]);

  const updateProgress = (type, idx) => {
    if (type === 'sanctuary') {
      const newItems = [...sanctuaryProgress.items];
      newItems[idx].completed = !newItems[idx].completed;
      const completedCount = newItems.filter(item => item.completed).length;
      const newValue = Math.round((completedCount / newItems.length) * 100);
      setSanctuaryProgress({
        ...sanctuaryProgress,
        value: newValue,
        items: newItems
      });

      const completedItem = newItems[idx];
      if (completedItem.milestoneTrigger) {
        const newMilestones = [...sanctuaryMilestones];
        const milestoneIndex = newMilestones.findIndex(m => m.id === completedItem.milestoneTrigger);
        if (milestoneIndex !== -1) {
          newMilestones[milestoneIndex].completed = completedItem.completed;
          setSanctuaryMilestones(newMilestones);
        }
      }
    } else if (type === 'nutrition') {
      const newItems = [...nutritionProgress.items];
      newItems[idx].completed = !newItems[idx].completed;
      const completedCount = newItems.filter(item => item.completed).length;
      const newValue = Math.round((completedCount / newItems.length) * 100);
      setNutritionProgress({
        ...nutritionProgress,
        value: newValue,
        items: newItems
      });

      const completedItem = newItems[idx];
      if (completedItem.milestoneTrigger) {
        const newMilestones = [...nutritionMilestones];
        const milestoneIndex = newMilestones.findIndex(m => m.id === completedItem.milestoneTrigger);
        if (milestoneIndex !== -1) {
          newMilestones[milestoneIndex].completed = completedItem.completed;
          setNutritionMilestones(newMilestones);
        }
      }
    }
  };

  const completeMilestone = (type, idx) => {
    if (type === 'sanctuary') {
      const milestone = sanctuaryMilestones[idx];
      const canComplete = milestone.triggerProgress.every(triggerName => 
        sanctuaryProgress.items.find(item => item.name === triggerName)?.completed
      );
      if (canComplete) {
        const newMilestones = [...sanctuaryMilestones];
        newMilestones[idx].completed = !newMilestones[idx].completed;
        setSanctuaryMilestones(newMilestones);
      }
    } else if (type === 'nutrition') {
      const milestone = nutritionMilestones[idx];
      const canComplete = milestone.triggerProgress.every(triggerName => 
        nutritionProgress.items.find(item => item.name === triggerName)?.completed
      );
      if (canComplete) {
        const newMilestones = [...nutritionMilestones];
        newMilestones[idx].completed = !newMilestones[idx].completed;
        setNutritionMilestones(newMilestones);
      }
    }
  };

  const renderContent = (type) => {
    const progress = type === 'sanctuary' ? sanctuaryProgress : nutritionProgress;
    const milestones = type === 'sanctuary' ? sanctuaryMilestones : nutritionMilestones;
    const Icon = type === 'sanctuary' ? Home : Coffee;
    const title = type === 'sanctuary' ? "Sanctuary (Home Design)" : "Food & Nutrition";
    const missionStatement = type === 'sanctuary' 
      ? "Transform my living space into a true sanctuary that supports my wellbeing and my dogs' needs. Create a clean, organized, and comfortable home environment starting with essential projects like the fence for my dogs and establishing a proper bedroom."
      : "Transform my approach to nutrition by establishing consistent healthy meals, working with professionals, and creating sustainable eating habits that support my health goals.";

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        <div className="border rounded-lg p-4 bg-blue-50">
          <h3 className="font-semibold mb-2">Mission Statement</h3>
          <p className="text-gray-800">{missionStatement}</p>
        </div>

        <div className="border rounded-lg p-4 bg-white mb-6">
          <h3 className="font-semibold mb-4">Progress Tracking</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{progress.label}</span>
              <span className="text-sm">{progress.value}% Complete</span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                  progress.value >= 80 ? 'bg-green-500' : 
                  progress.value >= 50 ? 'bg-blue-500' : 
                  progress.value >= 25 ? 'bg-yellow-500' : 'bg-gray-300'
                }`}
                style={{ width: `${progress.value}%` }}
              />
            </div>
            <div className="grid gap-2">
              {progress.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => updateProgress(type, idx)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className={item.completed ? 'line-through text-gray-500' : ''}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-4">Celebration Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-lg border ${
                  milestone.completed ? 'bg-green-50 border-green-200' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {milestone.completed ? (
                      <Trophy className="text-yellow-500" size={20} />
                    ) : (
                      <Star className="text-gray-400" size={20} />
                    )}
                    <h4 className="font-medium">{milestone.title}</h4>
                  </div>
                  <button
                    onClick={() => completeMilestone(type, idx)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      milestone.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {milestone.completed ? 'Completed!' : 'Mark Complete'}
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div>Target: {milestone.target}</div>
                  <div>Impact: {milestone.impact}</div>
                  {milestone.completed && (
                    <div className="mt-1 text-green-600">
                      Reward earned: {milestone.reward}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('sanctuary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === 'sanctuary'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Home size={16} />
            Sanctuary
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === 'nutrition'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Coffee size={16} />
            Food & Nutrition
          </button>
        </div>
        
        {renderContent(activeTab)}
      </CardContent>
    </Card>
  );
};

export default LifeDashboard;