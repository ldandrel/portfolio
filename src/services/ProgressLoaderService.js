import axios from 'axios';

class ProgressLoader {
  constructor(elements) {
    this.elements = elements;
    this.requests = [];
    this.progressEvents = [];
    this.completeEvents = [];
    this.totalProgress = 0;
    this.average = 0;

    this.init();
  }

  init() {
    this.elements.forEach(element => {
      this.requests.push({
        element,
        progress: 0
      });
    });

    this.requests.forEach((request, index) => {
      axios.get(request.element, {
        onDownloadProgress: progressEvent => {
          const percent = Math.round(
            progressEvent.loaded / progressEvent.total * 100
          );

          this.updateProgress(index, percent, request.element);
        }
      });
    });
  }

  updateProgress(index, progress, element) {
    this.requests[index].progress = progress;
    const total = this.requests.reduce(
      (value, request) => value + request.progress,
      0
    );
    const average = Math.floor(total / this.requests.length);

    /*
    console.warn(average)
    console.log(this.average)
    console.log(average > this.average)

    if (this.average === 0) {
      this.average = average
    } else if (average > this.average) {
      this.average = average
    }
    // console.log(this.average)
    // if (average > this.average || this.average === 0) ;

    */

    this.totalProgress = average;

    if (this.totalProgress === 100) {
      this.progressEventsCall();
      this.completeEventsCall();
    } else {
      this.progressEventsCall();
    }
  }

  progressEventsCall() {
    this.progressEvents.forEach(({ callback }) => {
      callback(this.totalProgress);
    });
  }

  completeEventsCall() {
    this.completeEvents.forEach(({ callback }) => {
      callback();
    });
  }

  on(event, callback) {
    switch (event) {
      case 'progress':
        this.progressEvents.push({ callback });
        break;

      case 'complete':
        this.completeEvents.push({ callback });
        break;

      default:
        break;
    }
  }
}

export default ProgressLoader;
