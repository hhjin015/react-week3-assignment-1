import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  context('사용자가 처음 앱을 실행시키면', () => {
    it(' "To-do"라는 문구가 보인다. ', () => {
      const { container } = render(<App />);
      expect(container).toHaveTextContent('To-do');
    });

    it(' "할 일"라는 문구가 보인다. ', () => {
      const { container } = render(<App />);
      expect(container).toHaveTextContent('할 일');
    });

    it(' "추가"라는 문구가 보인다. ', () => {
      const { container } = render(<App />);
      expect(container).toHaveTextContent('추가');
    });

    it(' "할 일이 없어요!"라는 문구가 보인다. ', () => {
      const { container } = render(<App />);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('사용자가 "바뀐다"라는 할 일을 입력하면', () => {
    it('입력창에 "바뀐다"라는 문구 보인다.', () => {
      const { getByLabelText } = render(<App />);

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '바뀐다',
        },
      });

      expect(getByLabelText('할 일').value).toBe('바뀐다');
    });
  });

  context('사용자가 할 일을 입력한 후 추가를 누르면', () => {
    it('할 일이 추가 된다.', () => {
      const {
        container,
        getByLabelText,
        getByText,
        getByPlaceholderText,
      } = render(<App />);

      const inputTodo = getByLabelText('할 일');

      fireEvent.change(inputTodo, { target: { value: '할 일1' } });

      fireEvent.click(getByText('추가'));

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();

      expect(container).toHaveTextContent('할 일1');

      expect(container).toHaveTextContent('완료');
    });
  });

  context('사용자가 "할 일1" 할 일에 대한 완료 버튼을 누르면', () => {
    const tasks = [
      {
        id: 1,
        title: '할 일1',
      },
      {
        id: 2,
        title: '할 일2',
      },
      {
        id: 3,
        title: '할 일3',
      },
    ];

    it(' "할 일1"이 보이지 않는다.', () => {
      const { container, getByLabelText, getByText, getAllByText } = render(
        <App />,
      );

      const inputTodo = getByLabelText('할 일');

      tasks.forEach((item) => {
        fireEvent.change(inputTodo, { target: { value: item.title } });

        fireEvent.click(getByText('추가'));
      });

      const doneButtons = getAllByText('완료');

      doneButtons.forEach((button) => fireEvent.click(button));

      expect(container).not.toHaveTextContent('할 일1');

      expect(container).not.toHaveTextContent('완료');
    });
  });
});
