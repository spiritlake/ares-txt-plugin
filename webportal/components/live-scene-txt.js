import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { scrollElementToBottom } from 'ares-webportal/helpers/scroll-element';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  scenePose: '',
  gameSocket: service(),
  session: service(),
  tagName: '',


  @action
  addTxt() {
      let pose = this.get('scenePose');
      if (pose.length === 0) {
          this.get('flashMessages').danger("You haven't entered anything.");
          return;
      }
      let api = this.get('gameApi');
      this.set('scenePose', '');
      api.requestOne('addTxt', { scene_id: this.get('scene.id'),
          pose: pose,
          pose_char: this.get('scene.poseChar.id') }, null)
      .then( (response) => {
          if (response.error) {
              this.get('flashMessages').danger(response.error);
              return;
          }
          scrollElementToBottom('live-scene-log');          
      });
  }
});
