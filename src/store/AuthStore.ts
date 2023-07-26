import { makeAutoObservable, runInAction } from 'mobx';

class AuthStore {
  mfaCodes: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addMfaCode(code: string) {
    this.mfaCodes.push(code);
  }

  generateRandomCode() {
    const code = Math.floor(Math.random() * 900000) + 100000;
    this.addMfaCode(code.toString());
  }

  removeMfaCode(code: string) {
    const index = this.mfaCodes.indexOf(code);
    if (index !== -1) {
      runInAction(() => {
        this.mfaCodes.splice(index, 1);
      });
    }
  }
}

const authStore = new AuthStore();
export default authStore;
