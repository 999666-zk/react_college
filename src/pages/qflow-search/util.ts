export const filterSpecialCharacter = (str: string) => {
  /* eslint-disable */
  const pattern = /[ `!@·！～@#¥%……&*（）——+「」【】｜、《》，。/？#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g

  return str.replace(pattern, '')
}
