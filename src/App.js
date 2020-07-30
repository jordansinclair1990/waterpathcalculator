import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focalLength: 0,
      targetDepth: 0,
      materialVRatio: 0,
      materialDiameter: 0,
      showResults: 'hide',
    };

    this.changeTargetDepth = this.changeTargetDepth.bind(this);

    this.changeFocalLength = this.changeFocalLength.bind(this);

    this.changeDiameter = this.changeDiameter.bind(this);

    this.changeMaterial = this.changeMaterial.bind(this);

    this.showResults = this.showResults.bind(this);
  }

  changeFocalLength(event) {
    this.setState({
      focalLength: parseFloat(event.target.value),
    });
  }

  changeTargetDepth(event) {
    this.setState({
      targetDepth: parseFloat(event.target.value),
    });
  }

  changeDiameter(event) {
    this.setState({
      materialDiameter: parseFloat(event.target.value),
    });
  }

  changeMaterial(event) {
    if (event.target.value == 'Select Material Type') {
      this.setState({
        materialVRatio: 0,
      });
    }
    if (event.target.value == 'Titanium') {
      this.setState({
        materialVRatio: 3.984,
      });
    }
    if (event.target.value == 'Nickel') {
      this.setState({
        materialVRatio: 3.782,
      });
    }
    if (event.target.value == 'Steel') {
      this.setState({
        materialVRatio: 3.984,
      });
    }
  }

  showResults() {
    this.setState({
      showResults: 'show',
    });
  }

  refreshPage() {
    window.location.reload(false)
  }



  render() {
    let fl = this.state.focalLength
    let d = this.state.targetDepth
    let k = this.state.materialVRatio
    let Dia = this.state.materialDiameter

    let numerator = d * k * Dia;
    let denominator = ((2 * d) * (k - 1));
    let diameter = Dia;
    denominator = denominator + diameter;

    let waterpath = fl - (numerator / denominator)

    let waterpathclean = waterpath.toFixed(3)
    return (
      <div className='App'>
        <div className='header'>
          <div className='inner-header'>
            <div className='logo-container'>
              <h1>Focal Depth Calculator</h1>
            </div>
            <ul className='navigation'>
              <a href='#'>
                <li onClick={this.refreshPage}>Reset</li>
              </a>
            </ul>
          </div>
        </div>

        <div className='wrapper'>
          <div className='contact-form'>
            <div className='input-fields'>
              <input
                type='text'
                className='input'
                placeholder='Transducer Focal Length'
                onChange={this.changeFocalLength}
              />
              <input
                type='text'
                className='input'
                placeholder='Target Depth'
                onChange={this.changeTargetDepth}
              />

              <select
                name='material-type'
                id='material-type'
                onChange={this.changeMaterial}
              >
                <option value='Select Material Type'>
                  Select Material Type
                </option>
                <option value='Titanium'>Titanium</option>
                <option value='Nickel'>Nickel</option>
                <option value='Steel'>Steel</option>
              </select>
              <input
                type='text'
                className='input'
                placeholder='Material Diameter'
                onChange={this.changeDiameter}
              />
            </div>
            <div className='msg'>
              <p className={this.state.showResults}>
                The water path should be set to{' '}
                {waterpathclean}{' '}
                inches.
              </p>
              <div className='btn' onClick={this.showResults}>
                Calculate
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
