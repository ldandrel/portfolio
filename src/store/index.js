import Vue from 'vue';
import Vuex from 'vuex';
import content from '@/data/content.json';
import {
  LOAD_ASSETS,
  LOAD_ASSETS_PROGRESS,
  LOAD_ASSETS_LOADED,
  LOAD_WEBSITE,
  SWITCH_CURRENT_PROJECT,
  TRANSITIONING,
  SWITCH_MOBILE
} from '@/store/types';
import ProgressLoaderService from '@/services/ProgressLoaderService';

Vue.use(Vuex);

const state = {
  content,
  assetsLoadingProgress: 0,
  assetsLoaded: false,
  websiteReady: false,
  currentProject: false,
  transitioning: false,
  darkMode: false,
  isMobile: false
};

const mutations = {
  [LOAD_ASSETS_PROGRESS](state, progress) {
    state.assetsLoadingProgress = progress;
  },
  [LOAD_ASSETS_LOADED](state) {
    state.assetsLoaded = true;
  },
  [LOAD_WEBSITE](state) {
    state.websiteReady = true;
  },
  [SWITCH_CURRENT_PROJECT](state, id) {
    state.currentProject = id;
  },
  [TRANSITIONING](state, value) {
    state.transitioning = value;
  },
  [SWITCH_MOBILE](state, boolean) {
    state.isMobile = boolean;
  }
};

const actions = {
  [LOAD_ASSETS]: ({ commit, state }) => {
    const progressLoaderService = new ProgressLoaderService(
      state.content.assets
    );
    progressLoaderService.on('progress', progress => {
      commit(LOAD_ASSETS_PROGRESS, progress);
    });
    progressLoaderService.on('complete', () => {
      commit(LOAD_ASSETS_LOADED);
      setTimeout(() => {
        commit(LOAD_WEBSITE);
      }, 4500);
    });
  }
};

const getters = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
