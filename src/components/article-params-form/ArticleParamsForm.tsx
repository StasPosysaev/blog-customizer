import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { SPACING } from '../../constants/styles';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const sidebarRef = useRef<HTMLElement>(null);

	useOutsideClick(
		sidebarRef,
		() => {
			setIsSidebarOpen(false);
		},
		isSidebarOpen
	);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const updateFormState = (newState: Partial<ArticleStateType>) => {
		setFormState((prev) => ({ ...prev, ...newState }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentArticleState(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройки статьи
					</Text>

					<div style={{ marginTop: SPACING.SECTION_LARGE }}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								updateFormState({ fontFamilyOption: option })
							}
							title='Шрифт'
							placeholder='Выберите шрифт'
						/>
					</div>

					<div style={{ marginTop: SPACING.SECTION_MEDIUM }}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => updateFormState({ fontSizeOption: option })}
						/>
					</div>

					<div style={{ marginTop: SPACING.SECTION_MEDIUM }}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) => updateFormState({ fontColor: option })}
							title='Цвет шрифта'
							placeholder='Выберите цвет'
						/>
					</div>

					<Separator />

					<div style={{ marginTop: SPACING.SECTION_MEDIUM }}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								updateFormState({ backgroundColor: option })
							}
							title='Цвет фона'
							placeholder='Выберите цвет фона'
						/>
					</div>

					<div style={{ marginTop: SPACING.SECTION_MEDIUM }}>
						<RadioGroup
							name='contentWidth'
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) => updateFormState({ contentWidth: option })}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
