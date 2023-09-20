import { useCallback, useState, useEffect, useRef, ChangeEvent, useContext, useMemo } from 'react'
import { Checkbox, Input, Button, InputRef } from 'antd'
import Icon from '@ant-design/icons/lib/components/Icon'

import { getSuggestOption, postFeedback } from '@/requests'
import exLike from '@/assets/icons/ex-like'
import exDislike from '@/assets/icons/ex-dislike'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { SuggestionDocument } from '@/pages/help-docs/interface'

type FeedbackDataItem = {
  goodText: CheckboxValueType[]
  badText: CheckboxValueType[]
  badReason: string
  docName: string
  otherFeedback: string
}
const initData: FeedbackDataItem = { goodText: [], badText: [], badReason: '', docName: '', otherFeedback: "" }
const helpArr = [
  {
    icon: exLike,
    text: '有帮助',
  },
  {
    icon: exDislike,
    text: '没帮助',
  },
]


export default function Help(props: any) {
  const node = props.node
  const inputRef = useRef<InputRef>(null)
  //-1:用户未提交反馈，显示反馈询问，-2：显示提交成功的信息，反馈询问不展示，-3：显示帮助反馈信息输入，-4：用户已提交过，反馈模块不展示
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [helpful, setHelpful] = useState(Boolean)
  //最后提交给后台的数据
  const [feedbackData, setFeedbackData] = useState(initData)
  // 用于切换帮助按钮清空已选择的value
  const [checkDefaultValue, setCheckDefaultValue] = useState(Array<CheckboxValueType>)
  // 设置更多建议
  const [moreSuggestValue, setMoreSuggestValue] = useState(String)

  const [questionData, setQuestionData] = useState<SuggestionDocument[]>()
  useMemo(async () => {
    const quetionsAns = await getSuggestOption();

    const questionD = quetionsAns.data.data;
    setQuestionData(() => {
      questionD.map((item: SuggestionDocument) => {
        item.questionsArr = item.questions.split(",")
      })
      return questionD;
    })
  }, [])
  // 1:没帮助，0:有帮助，
  useEffect(() => {

    if (currentIndex == 0) {
      setHelpful(true)
      setFeedbackData((data) => {
        data.badText = []
        return data
      })

    } else if (currentIndex == 1) {
      setHelpful(false)
      setFeedbackData((data) => {
        data.goodText = []
        return data
      })
    }

  }, [currentIndex])

  // checkout多选框选中变化的回调，更改对应的item的isChecked值，改值最后用于信息收集
  const onChange = useCallback(
    (checkedValues: CheckboxValueType[]) => {
      setCheckDefaultValue(checkedValues);
      setFeedbackData((data) => {
        if (helpful) {
          data.badText = []
          data.goodText = checkedValues
        } else {
          data.goodText = []
          data.badText = checkedValues
        }
        return data
      })
    },
    [helpful]
  )

  // 提交反馈建议
  const submit = () => {
    setFeedbackData((data) => {
      // 将本篇文章的title填入feedbackData
      data.docName = node.title
      if (helpful) {
        data.otherFeedback = moreSuggestValue
      } else {
        data.badReason = moreSuggestValue
      }

      // 存取input框中的value值，存取后置空
      setMoreSuggestValue("");
      return data
    })
    const data = { data: [feedbackData] }
    postFeedback(data)
    setCurrentIndex(-2)
  }

  // 切换解决和未解决，并同时清空之前checkbox的value
  const changeIsHelp = (index: number) => {
    setCurrentIndex(index)
    setCheckDefaultValue([])
    setMoreSuggestValue("");
  }

  const suggestInputOnchage = (event: ChangeEvent<HTMLInputElement>) => {
    setMoreSuggestValue(event.target.value)
  }

  return (
    <div className="flex flex-col mb-40 border-0 border-t border-solid border-10 pt-16 gap-20">
      {currentIndex == -2 ? (
        ''
      ) : (
        <div className="flex items-center">
          <span className="inline-block font-semibold mr-16">这篇文档对你是否有帮助？</span>
          {helpArr.map((item, index) => {
            return (
              <button
                key={item.text}
                onClick={() => changeIsHelp(index)}
                className={`flex gap-4  mr-12 px-16 py-8   border border-solid border-20 rounded-small text-gray-90 cursor-pointer ${index == currentIndex ? 'bg-gray-40' : 'bg-white'
                  } `}
              >
                <Icon component={item.icon}></Icon>
                <span>{item.text}</span>
              </button>
            )
          })}
        </div>
      )}

      {currentIndex == -1 ? (
        ''
      ) : currentIndex == -2 ? (
        <div className="h-40 pl-8 leading-h1 border border-solid border-10 rounded-small text-gray-90 bg-gray-40">
          提交成功！感谢你的反馈，我们会努力做更好！
        </div>
      ) : (
        <div>
          <h4 className="font-semibold">{helpful ? '文档哪些方面为你提供了帮助?' : '你是否遇到了以下问题？'}</h4>
          <Checkbox.Group className="flex flex-wrap" value={checkDefaultValue} options={questionData ? questionData[currentIndex].questionsArr : []} onChange={onChange}></Checkbox.Group>
          <Input ref={inputRef} value={moreSuggestValue} onChange={(event) => suggestInputOnchage(event)} placeholder="更多建议（选填）" size="small" className="mt-12 pl-8 h-[28px] leading-h3" />
          <Button onClick={submit} type="primary" className="mt-16  ">
            立即提交
          </Button>
        </div>
      )}

      <span className="block ">
        如需获取即时帮助，请咨询电话<span className="text-orange-50">400-000-5276</span>
      </span>
    </div>
  )
}
