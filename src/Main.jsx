import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateAccount } from './store/actionCreators';
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';
import './Main.css';

import Input from './Input';

class Main extends Component {
  state = {
    sell: true,
    showExtra: false,
    bitPrice: 18963.28,
    tenNganHang: '',
    soTaiKhoan: '',
    submitted: false
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        bitPrice: Math.floor(Math.random() * (18963 - 15420) + 15420),
      });
    }, 5000);
  }

  toggleChange = event => {
    if (event.target.value === 'sell') {
      this.setState({
        sell: true,
      });
    } else {
      this.setState({
        sell: false,
      });
    }
  };

  toggleShowExtra = event => {
    event.preventDefault();
    this.setState({
      showExtra: !this.state.showExtra,
    });
  };

  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      errors: {
        [ev.target.name]: '',
      },
    });
  };

  onAccFocus = ev => {
    this.props.validateAccount({
      soTaiKhoan: this.state.soTaiKhoan
    });
  };

  submitForm = event => {
    event.preventDefault();
    const myForm = document.getElementById('myForm');
    const formData = new FormData(myForm);
    var object = {
      sell: this.state.sell,
    };
    formData.forEach((value, key) => {
      object[key] = value;
    });
    this.setState({
      submitted: true,
    });
    console.log('data', object);
  };

  render() {
    const showOrHide = this.state.showExtra
      ? {
          display: 'block',
        }
      : {
          display: 'none',
        };
    return (
      <form id="myForm">
        <p className="header">Biểu mẫu tạo quảng cáo</p>
        <h2>Thông tin quảng cáo</h2>
        <FormGroup>
          <ControlLabel>Tôi muốn</ControlLabel>
          <FormControl
            bsSize="lg"
            componentClass="select"
            placeholder="select"
            className="btn btn-default"
            onChange={this.toggleChange}
          >
            <option value="sell">Bán Bitcoin</option>
            <option value="buy">Mua bitcoin</option>
          </FormControl>
        </FormGroup>
        <Input
          title="Giá bitUSD"
          description="Giá 1 bitUSD theo VND"
          value="22,750.0"
          unit="VND"
          displayedUnit="VND/bitUSD"
          name="giaBitUSD"
        />
        <Row>
          <Col xs={3}>
            Giá bitcoin bạn thực {this.state.sell ? `nhận` : `trả`}
          </Col>
          <Col xs={3}>
            <strong>
              {this.numberWithCommas(this.state.bitPrice * 22700)} VND/BTC
            </strong>
          </Col>
          <Col xs={1} />
          <Col xs={5} className="explanation">
            Đây là giá tương ứng với tỉ giá Bitstamp (Blockchain) hiện tại (<span
              style={{ color: '#9b59b6', fontWeight: 'bold' }}
            >
              {this.state.bitPrice}
            </span>). Giá sẽ biến động khi tỉ giá Bitstamp (Blockchain) thay
            đổi.
          </Col>
        </Row>
        <div style={showOrHide} className="offer-extra-fields">
          <Row className="row">
            <Col xs={3}>
              Giá bitcoin người {this.state.sell ? `mua` : `bán`} thấy
            </Col>
            <Col xs={3}>
              <strong>
                {this.state.sell
                  ? this.numberWithCommas((this.state.bitPrice + 200) * 22700)
                  : this.numberWithCommas(
                      (this.state.bitPrice - 200) * 22700,
                    )}{' '}
                VND / BTC
              </strong>
            </Col>
            <Col xs={1} />
            <Col xs={5} className="explanation">
              Giá đã bao gồm phí giao dịch do người{' '}
              {this.state.sell ? `mua` : `bán`} chịu.
            </Col>
          </Row>
          <Input
            title="Đơn vị tiền tệ"
            description="Đơn vị tiền tệ để đổi lấy BTC"
            value={['VND', 'USD']}
            name="donViTienTe"
          />
          <Input
            title="Số tiền tối thiểu"
            description="Hạn mức giao dịch tối thiểu trong một giao dịch. (Ít nhất là 0.001 Bitcoin)"
            value="0.01"
            unit="BTC"
            displayedUnit="BTC"
            name="soTienToiThieu"
          />
          <Input
            title="Số tiền tối đa"
            description="Hạn mức giao dịch tối đa trong một giao dịch. Nếu bạn là người bán, số dư trong ví Bitcoin bạn có thể giới hạn lượng giao dịch tối đa. (Tối đa là 100 Bitcoin)"
            value="2"
            unit="BTC"
            displayedUnit="BTC"
            name="soTienToiDa"
          />
          {this.state.sell ? (
            <div>
              <Input
                title="Giá Bitcoin tối thiểu"
                description="Giá tối thiểu bạn chấp nhận cho 1 Bitcoin (tính theo VND)"
                unit="VND"
                name="giaBitcoinToiThieu"
              />
              <Input
                title="Sàn giao dịch tham khảo"
                description="Sàn giao dịch được dùng để cập nhập giá cho quảng cáo của bạn"
                value={['Bitstamp (Blockchain)', 'Bitfinex', 'Kraken EUR']}
                name="sanGiaoDichThamKhao"
              />
            </div>
          ) : (
            <div>
              <Input
                title="Sàn giao dịch tham khảo"
                description="Sàn giao dịch được dùng để cập nhập giá cho quảng cáo của bạn"
                value={['Bitstamp (Blockchain)', 'Bitfinex', 'Kraken EUR']}
                name="sanGiaoDichThamKhao"
              />
              <Input
                title="Giá Bitcoin tối đa"
                description="Giá tối đa bạn chấp nhận cho 1 Bitcoin (tính theo VND)"
                unit="VND"
                name="giaBitcoinToiDa"
              />
            </div>
          )}
          <Input
            title="Thời gian cho phép thanh toán"
            description="Nếu người mua không hoàn thành thanh toán trong thời gian này, giao dịch sẽ bị huỷ tự động"
            value={['15', '30']}
            unit="phút"
            displayedUnit="phút"
            name="thoiGianChoPhepThanhToan"
          />
          <Input
            title="Vị trí"
            description=""
            value={['Việt Nam', 'Australia']}
            name="viTri"
          />
          {this.state.sell ? (
            <Input
              title="Từ chối người mua chưa xác minh"
              description="Chỉ chấp nhận người mua đã xác minh để làm cho các giao dịch của bạn trở nên an toàn hơn"
              value={['Không', 'Có']}
              name="tuChoiNguoiMuaChuaXacMinh"
              customElement="toggle"
            />
          ) : (
            ''
          )}
        </div>
        <Row className="text-center">
          <Col xs={12}>
            <button className="btn btn-default" onClick={this.toggleShowExtra}>
              thêm lựa chọn
            </button>
          </Col>
        </Row>
        <hr />
        {this.state.sell ? (
          <Row>
            <Col xs={12}>
              <h2>Thông tin thanh toán</h2>
            </Col>
          </Row>
        ) : (
          ''
        )}
        <Input
          title="Phương thức thanh toán"
          description="Phương thức thanh toán cho quảng cáo này"
          value={[
            'Chuyển khoản ngân hàng',
            'Nộp tiền mặt vào tài khoản ngân hàng',
          ]}
          name="phuongThucThanhToan"
        />
        <FormGroup
          controlId="formControlsSelect"
          className="short-form-control"
          validationState={
            this.state.submitted
              ? this.state['tenNganHang'] ? null : 'error'
              : null
          }
        >
          <ControlLabel>Tên ngân hàng</ControlLabel>
          <FormControl
            className="btn btn-default"
            bsSize="lg"
            componentClass="select"
            placeholder="select"
            name="tenNganHang"
            value={this.state['tenNganHang']}
            onChange={ev => this.handleInputChange(ev)}
          >
            <option value="">Chọn ngân hàng</option>
            <option value="acb">ACB (Ngân hàng Á Châu)</option>
            <option value="vietinbank">Vietinbank</option>
            <option value="Agribank">Agribank</option>
          </FormControl>
          {this.state.submitted &&
            !this.state['tenNganHang'] && (
              <HelpBlock>Thông tin này là cần thiết.</HelpBlock>
            )}
        </FormGroup>
        {this.state.sell ? (
          <div>
            <FormGroup
              controlId="formBasicText"
              className="short-form-control"
              validationState={
                this.props.errors['soTaiKhoan']
                  ? 'error'
                  : this.state.submitted
                    ? this.state['soTaiKhoan'] ? null : 'error'
                    : null
              }
            >
              <ControlLabel>Số tài khoản:</ControlLabel>
              <FormControl
                bsSize="lg"
                type="text"
                name="soTaiKhoan"
                required
                value={this.state['soTaiKhoan']}
                onChange={ev => this.handleInputChange(ev)}
              />
              {(this.props.errors['soTaiKhoan'] && (
                <HelpBlock>{this.props.errors['soTaiKhoan']}</HelpBlock>
              )) ||
                (this.state.submitted &&
                  !this.state['soTaiKhoan'] && (
                    <HelpBlock>Thông tin này là cần thiết.</HelpBlock>
                  ))}
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              className="short-form-control"
              validationState={
                this.state.submitted
                  ? this.props.tenTaiKhoan ? null : 'error'
                  : null
              }
            >
              <ControlLabel>Tên tài khoản:</ControlLabel>
              <FormControl
                bsSize="lg"
                type="text"
                name="tenTaiKhoan"
                required
                value={this.props.tenTaiKhoan}
                disabled={this.props.tenTaiKhoan ? true : false}
                onChange={ev => this.handleInputChange(ev)}
                onFocus={ev => this.onAccFocus(ev)}
              />
              {this.state.submitted &&
                !this.props.tenTaiKhoan && (
                  <HelpBlock>Thông tin này là cần thiết.</HelpBlock>
                )}
            </FormGroup>
          </div>
        ) : (
          ''
        )}
        <button
          className="d-block btn-save-offer btn btn-primary"
          onClick={this.submitForm}
        >
          Tạo
        </button>
      </form>
    );
  }
}

Main.propTypes = {};

function mapStateToProps(state) {
  return {
    tenTaiKhoan: state.tenTaiKhoan,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { validateAccount })(Main);
