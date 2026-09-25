import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import CommunityMainView from './views/CommunityMainView';
import CreatePostModal from './views/CreatePostModal';
import PostDetailView from './views/PostDetailView';
import ExploreView from './views/ExploreView';
import ChallengesView from './views/ChallengesView';
import GroupsView from './views/GroupsView';
import GroupDetailView from './views/GroupDetailView';
import UserProfileView from './views/UserProfileView';
import MyPostsView from './views/MyPostsView';
import CreatePollModal from './views/CreatePollModal';
import CommunityNotificationsView from './views/CommunityNotificationsView';
import CommunitySettingsView from './views/CommunitySettingsView';
import { useBackHandler } from '../../context/BackNavigationContext';
import {
  INITIAL_POSTS,
  CHALLENGES_LIST,
  GROUPS_LIST,
  USER_PROFILES
} from './data/communityData';
import './CommunityScreen.css';

export function CommunityScreen({ onNavigateTab }) {
  // Navigation State
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'explore' | 'challenges' | 'groups' | 'group-detail' | 'user-profile' | 'my-posts' | 'notifications' | 'settings'
  const [activeFeedTab, setActiveFeedTab] = useState('For You');
  const [activePost, setActivePost] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeUserHandle, setActiveUserHandle] = useState('riyasharma');

  // Global Action Sheet & Toast State
  const [activeActionSheet, setActiveActionSheet] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  // Modals State
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [createPostType, setCreatePostType] = useState('photo');
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);

  // Register Native Back Handler for nested Community subviews & modals
  useBackHandler(() => {
    if (activeActionSheet) {
      setActiveActionSheet(null);
      return true;
    }
    if (isCreatePollOpen) {
      setIsCreatePollOpen(false);
      return true;
    }
    if (isCreatePostOpen) {
      setIsCreatePostOpen(false);
      return true;
    }
    if (activePost) {
      setActivePost(null);
      return true;
    }
    if (activeGroup) {
      setActiveGroup(null);
      return true;
    }
    if (currentView !== 'main') {
      setCurrentView('main');
      setActiveFeedTab('For You');
      return true;
    }
    return false;
  }, true, 10);

  // Community Dynamic Data State
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [challenges, setChallenges] = useState(CHALLENGES_LIST);
  const [groups, setGroups] = useState(GROUPS_LIST);
  const [profiles, setProfiles] = useState(USER_PROFILES);

  // Feed Tab Switcher
  const handleSelectFeedTab = (tab) => {
    setActiveFeedTab(tab);
    if (tab === 'Challenges') {
      setCurrentView('challenges');
    } else if (tab === 'Groups') {
      setCurrentView('groups');
    } else {
      setCurrentView('main');
    }
  };

  // Like Toggle
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      })
    );
    if (activePost && activePost.id === postId) {
      setActivePost((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: !prev.isLiked ? prev.likesCount + 1 : prev.likesCount - 1
      }));
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, isBookmarked: !p.isBookmarked };
        }
        return p;
      })
    );
    if (activePost && activePost.id === postId) {
      setActivePost((prev) => ({
        ...prev,
        isBookmarked: !prev.isBookmarked
      }));
    }
  };

  // Add Comment
  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: 'You',
      avatar: '/src/assets/user_avatar.jpg',
      timeAgo: 'Just now',
      text: commentText.trim(),
      likes: 0,
      isLiked: false,
      repliesCount: 0
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [newComment, ...(p.comments || [])]
          };
        }
        return p;
      })
    );

    if (activePost && activePost.id === postId) {
      setActivePost((prev) => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      }));
    }
  };

  // Join / Leave Challenge
  const handleToggleChallenge = (challengeId) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, isJoined: !c.isJoined } : c))
    );
  };

  // Join / Leave Group
  const handleToggleGroup = (groupId) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, isJoined: !g.isJoined } : g))
    );
    if (activeGroup && activeGroup.id === groupId) {
      setActiveGroup((prev) => ({ ...prev, isJoined: !prev.isJoined }));
    }
  };

  // Follow / Unfollow User
  const handleToggleFollow = (handle) => {
    setProfiles((prev) => {
      const current = prev[handle];
      if (!current) return prev;
      return {
        ...prev,
        [handle]: {
          ...current,
          isFollowing: !current.isFollowing
        }
      };
    });
  };

  // Create Post Submit
  const handlePublishPost = (newPostData) => {
    const created = {
      id: `post-${Date.now()}`,
      author: {
        name: 'You',
        handle: 'pranav_p',
        avatar: '/src/assets/user_avatar.jpg',
        badge: 'Member'
      },
      timeAgo: 'Just now',
      image: newPostData.image,
      caption: newPostData.caption,
      macros: newPostData.macros || { calories: 380, protein: 22, fat: 10, carbs: 45 },
      likesCount: 0,
      isLiked: false,
      isBookmarked: false,
      comments: []
    };
    setPosts([created, ...posts]);
    setIsCreatePostOpen(false);
  };

  // Create Poll Submit
  const handlePublishPoll = (pollData) => {
    const newPostFromPoll = {
      id: `post-poll-${Date.now()}`,
      author: {
        name: 'You',
        handle: 'pranav_p',
        avatar: '/src/assets/user_avatar.jpg',
        badge: 'Member'
      },
      timeAgo: 'Just now',
      image: null,
      caption: `📊 POLL: ${pollData.question}\n${pollData.options.map((o, i) => `${i + 1}. ${o.text}`).join('\n')}`,
      macros: null,
      likesCount: 0,
      isLiked: false,
      isBookmarked: false,
      comments: []
    };
    setPosts([newPostFromPoll, ...posts]);
    setIsCreatePollOpen(false);
  };

  // Select Author & Navigate to Profile
  const handleSelectAuthor = (author) => {
    const handle = author.handle || 'riyasharma';
    setActiveUserHandle(handle);
    setCurrentView('user-profile');
  };

  // Open Post Details
  const handleSelectPost = (post) => {
    setActivePost(post);
  };

  // Open Group Detail
  const handleSelectGroup = (group) => {
    setActiveGroup(group);
    setCurrentView('group-detail');
  };

  const handleOpenCreatePost = (type = 'photo') => {
    setCreatePostType(type);
    setIsCreatePostOpen(true);
  };

  return (
    <div className="community-screen">
      {/* Scrollable Main Content Area */}
      <div className={`comm-screen-content-wrapper ${activeActionSheet ? 'comm-scroll-locked' : ''}`}>
        {/* Screen 01: Community Main Feed */}
        {currentView === 'main' && (
          <CommunityMainView
            posts={posts}
            activeFeedTab={activeFeedTab}
            onSelectFeedTab={handleSelectFeedTab}
            onOpenCreatePost={handleOpenCreatePost}
            onOpenCreatePoll={() => setIsCreatePollOpen(true)}
            onSelectPost={handleSelectPost}
            onSelectAuthor={handleSelectAuthor}
            onToggleLike={handleToggleLike}
            onToggleBookmark={handleToggleBookmark}
            onOpenExplore={() => setCurrentView('explore')}
            onOpenChallenges={() => setCurrentView('challenges')}
            onOpenGroups={() => setCurrentView('groups')}
            onOpenNotifications={() => setCurrentView('notifications')}
            onOpenSettings={() => setCurrentView('settings')}
            onOpenActionSheet={setActiveActionSheet}
            showToast={showToast}
          />
        )}

        {/* Screen 04: Explore */}
        {currentView === 'explore' && (
          <ExploreView
            posts={posts}
            onBack={() => setCurrentView('main')}
            onSelectPost={handleSelectPost}
          />
        )}

        {/* Screen 05: Challenges */}
        {currentView === 'challenges' && (
          <ChallengesView
            onBack={() => {
              setActiveFeedTab('For You');
              setCurrentView('main');
            }}
          />
        )}

        {/* Screen 06: Groups */}
        {currentView === 'groups' && (
          <GroupsView
            onBack={() => setCurrentView('main')}
            onSelectGroup={handleSelectGroup}
          />
        )}

        {/* Screen 07: Group Detail */}
        {currentView === 'group-detail' && activeGroup && (
          <GroupDetailView
            group={activeGroup}
            onBack={() => setCurrentView('groups')}
            onOpenActionSheet={setActiveActionSheet}
            showToast={showToast}
          />
        )}

        {/* Screen 08: User Profile */}
        {currentView === 'user-profile' && (
          <UserProfileView
            userHandle={activeUserHandle}
            onBack={() => setCurrentView('main')}
            onOpenMyPosts={() => setCurrentView('my-posts')}
            onOpenActionSheet={setActiveActionSheet}
            showToast={showToast}
          />
        )}

        {/* Screen 09: My Posts */}
        {currentView === 'my-posts' && (
          <MyPostsView
            onBack={() => setCurrentView('user-profile')}
            onOpenCreate={() => handleOpenCreatePost('photo')}
            onSelectPost={handleSelectPost}
          />
        )}

        {/* Screen 11: Community Notifications */}
        {currentView === 'notifications' && (
          <CommunityNotificationsView
            onBack={() => setCurrentView('main')}
            onOpenPost={(postId) => {
              const target = posts.find((p) => p.id === postId) || posts[0];
              handleSelectPost(target);
            }}
            onOpenProfile={(handle) => {
              setActiveUserHandle(handle);
              setCurrentView('user-profile');
            }}
          />
        )}

        {/* Screen 12: Community Settings */}
        {currentView === 'settings' && (
          <CommunitySettingsView onBack={() => setCurrentView('main')} />
        )}
      </div>

      {/* Screen 03: Post Details Modal/View */}
      {activePost && (
        <PostDetailView
          post={activePost}
          onBack={() => setActivePost(null)}
          onToggleLike={() => handleToggleLike(activePost.id)}
          onToggleBookmark={() => handleToggleBookmark(activePost.id)}
          onAddComment={(text) => handleAddComment(activePost.id, text)}
          onSelectAuthor={handleSelectAuthor}
          onOpenActionSheet={setActiveActionSheet}
          showToast={showToast}
        />
      )}

      {/* Screen 02: Create Post Modal */}
      {isCreatePostOpen && (
        <CreatePostModal
          initialType={createPostType}
          onClose={() => setIsCreatePostOpen(false)}
          onSubmitPost={handlePublishPost}
          onSwitchToPoll={() => {
            setIsCreatePostOpen(false);
            setIsCreatePollOpen(true);
          }}
        />
      )}

      {/* Screen 10: Create Poll Modal */}
      {isCreatePollOpen && (
        <CreatePollModal
          onClose={() => setIsCreatePollOpen(false)}
          onSubmitPoll={handlePublishPoll}
        />
      )}

      {/* Global Action Sheet Menu (Renders strictly on top of BottomNavBar) */}
      {activeActionSheet && (
        <div
          className="comm-action-sheet-backdrop"
          onClick={() => setActiveActionSheet(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="comm-action-sheet-card" onClick={(e) => e.stopPropagation()}>
            <div className="comm-action-sheet-group">
              {activeActionSheet.title && (
                <div className="comm-action-sheet-header">
                  <h4 className="comm-action-sheet-title">{activeActionSheet.title}</h4>
                  {activeActionSheet.sub && (
                    <p className="comm-action-sheet-sub">{activeActionSheet.sub}</p>
                  )}
                </div>
              )}

              {activeActionSheet.items &&
                activeActionSheet.items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`comm-action-sheet-item ${item.isDestructive ? 'destructive' : ''}`}
                      onClick={() => {
                        setActiveActionSheet(null);
                        if (item.onClick) item.onClick();
                      }}
                    >
                      {ItemIcon && <ItemIcon size={18} />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
            </div>

            <button
              type="button"
              className="comm-action-sheet-cancel"
              onClick={() => setActiveActionSheet(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Global Floating Toast */}
      {toastMessage && (
        <div className="comm-action-toast">
          <CheckCircle2 size={16} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default CommunityScreen;
