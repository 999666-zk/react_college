import { Steps, Card, Skeleton } from 'antd'
import styled from 'styled-components'
const Cardstep = styled(Card)`
  font-family: PingFang SC;
  font-size: 14px !important;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 4px 6px 0px #0c1f500a;
    background: #f9fafc;
  }
  .ant-card-body {
    padding: 12px;
    font-family: PingFang SC;
    font-size: 14px !important;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    border: 1px solid #e6eaf0;
    border-radius: 4px;
  }
  .ant-steps-item-title {
    height: 22px;
    line-height: 22px;
  }
`
const StepsQf = styled(Steps)`
  transition: all 0.3s;
  .ant-steps-icon-dot {
    width: 10px !important;
    height: 10px !important;
    box-sizing: border-box;
    border: 2px solid #767e89;
    border-radius: 8px;
    background: #f4f6f9 !important;
    transition: all 0.3s;
  }
  .ant-steps-item-content {
    margin-right: 0px;
    transition: all 0.3s;
  }
  .ant-steps-item-tail::after {
    background-color: #ccd4e0 !important;
    transition: all 0.3s;
  }

  .ant-steps-item-active {
    .ant-card-body {
      background-color: #fff6ef !important;
      border: 1px solid #ffb578 !important;
      box-sizing: border-box;
      border-radius: 4px;
      transition: all 0.3s;
    }
    .ant-steps-icon-dot {
      border: 2px solid #ffb578 !important;
      transition: all 0.3s;
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-tail::after {
      background-color: #ccd4e0 !important;
      transition: all 0.3s;
    }
  }
  .ant-steps-item-tail::after {
    margin-inline-start: 4.5px !important;
  }
  .ant-steps-item-title {
    height: 22px;
    line-height: 22px !important;
    font-family: PingFang SC;
    font-size: 14px !important;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const SkeletonQf = styled(Skeleton)`
  transition: all 0.3s;
  .ant-steps-icon-dot {
    width: 10px !important;
    height: 10px !important;
    box-sizing: border-box;
    border: 2px solid #767e89;
    border-radius: 8px;
    background: #f4f6f9 !important;
    transition: all 0.3s;
  }
  .ant-steps-item-content {
    margin-right: 0px;
    transition: all 0.3s;
  }
  .ant-steps-item-tail::after {
    background-color: #ccd4e0 !important;
    transition: all 0.3s;
  }

  .ant-steps-item-active {
    .ant-card-body {
      background-color: #fff6ef !important;
      border: 1px solid #ffb578 !important;
      box-sizing: border-box;
      border-radius: 4px;
      transition: all 0.3s;
    }
    .ant-steps-icon-dot {
      border: 2px solid #ffb578 !important;
      transition: all 0.3s;
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-tail::after {
      background-color: #ccd4e0 !important;
      transition: all 0.3s;
    }
  }
  .ant-steps-item-tail::after {
    margin-inline-start: 4.5px !important;
  }
  .ant-steps-item-title {
    height: 22px;
    line-height: 22px !important;
    font-family: PingFang SC;
    font-size: 14px !important;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
export { Cardstep, StepsQf, SkeletonQf }
