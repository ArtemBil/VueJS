let app = new Vue({
  el: "#app",
  data: {
    infoPeople: JSON.parse(localStorage.getItem("peopleInfo")) || {},
    isShownEditeWindow: false,
    isShownAddUserWindow: false,
    isShowPushJsonPanel: false,
    isFlag: false,
    editArray: [],
    addUserObj: {
      name: null,
      surname: null,
      phone: null,
      email: null
    }
  },
  methods: {
    adduser: function () {
      let counter = this.infoPeople.length;
      let error = document.querySelector('.error');
      if (this.addUserObj.name && this.addUserObj.surname && this.addUserObj.phone && this.addUserObj.email) {
        error.innerHTML = '';
        this.infoPeople.push({
          id: ++counter,
          name: this.addUserObj.name,
          surname: this.addUserObj.surname,
          phone: this.addUserObj.phone,
          email: this.addUserObj.email
        });
        localStorage.setItem('peopleInfo', JSON.stringify(this.infoPeople));
      } else {
        error.innerHTML = "You haven't filled all fields";
      }
    },
    editUser: function () {
      localStorage.setItem('peopleInfo', JSON.stringify(this.infoPeople));
    },
    deleteUser: function (i) {
      this.infoPeople.splice(i, 1);
      localStorage.setItem('peopleInfo', JSON.stringify(this.infoPeople));
    },
    openWindowControl: function (index) {
      this.isShownEditeWindow = !this.isShownEditeWindow;
      this.editArray[0] = this.infoPeople[index];
    },
    closeEditWindow: function () {
      this.isShownEditeWindow = false;
    },
    closeAddUserWindow: function () {
      this.isShownAddUserWindow = false;
    },
    addUserWindow: function () {
      this.isShownAddUserWindow = true;
    },
    openPushJsonPanel: function () {
      this.isShowPushJsonPanel = !this.isShowPushJsonPanel;
    },
    getJsonFile: function () {
      let isDone = document.querySelector('.isDone');
      let newJson = document.getElementById('json-file').files[0];
      let reader = new FileReader();
      reader.readAsText(newJson);
      reader.addEventListener('load', function () {
        localStorage.setItem('dynamicInformation', reader.result);
        isDone.innerHTML = "The json file is parsed(check locale storage)"
      });
    }
  }
});