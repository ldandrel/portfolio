import Vue from 'vue';
import Vuex from 'vuex';
import content from '@/data/content.json';
import {
  LOAD_ASSETS,
  LOAD_ASSETS_PROGRESS,
  LOAD_ASSETS_LOADED,
  LOAD_WEBSITE,
  SWITCH_MOBILE,
  RETURN_HOME,
  GO_ABOUT,
  GO_PROJECT,
  CURRENT_PROJECT,
  PREVIOUS_PROJECT
} from '@/store/types';
import ProgressLoaderService from '@/services/ProgressLoaderService';

Vue.use(Vuex);

const state = {
  content,
  assetsLoadingProgress: 0,
  assetsLoaded: false,
  websiteReady: false,
  goProject: false,
  isMobile: false,
  returnHome: false,
  goAbout: false,
  currentProject: 0,
  previousProject: null
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
  [SWITCH_MOBILE](state, boolean) {
    state.isMobile = boolean;
  },
  [RETURN_HOME](state, boolean) {
    state.returnHome = boolean;
  },
  [CURRENT_PROJECT](state, id) {
    state.currentProject = id;
  },
  [PREVIOUS_PROJECT](state, id) {
    state.previousProject = id;
  },
  [GO_ABOUT](state, boolean) {
    state.goAbout = boolean;
  },
  [GO_PROJECT](state, boolean) {
    state.goProject = boolean;
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
      }, 1000);
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
