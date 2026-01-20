import { createContext, useContext, useState, useCallback } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';

type ArticleContextType = {
	// Текущие примененные настройки статьи
	appliedState: ArticleStateType;
	// Текущие настройки в форме (могут отличаться от примененных)
	formState: ArticleStateType;
	// Открыт ли сайдбар
	isSidebarOpen: boolean;
	// Функции для обновления состояния
	updateFormState: (newState: Partial<ArticleStateType>) => void;
	applyFormState: () => void;
	resetFormState: () => void;
	toggleSidebar: () => void;
	closeSidebar: () => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const updateFormState = useCallback((newState: Partial<ArticleStateType>) => {
		setFormState((prev) => ({ ...prev, ...newState }));
	}, []);

	const applyFormState = useCallback(() => {
		setAppliedState(formState);
		setIsSidebarOpen(false);
	}, [formState]);

	const resetFormState = useCallback(() => {
		setFormState(defaultArticleState);
		setAppliedState(defaultArticleState);
		setIsSidebarOpen(false);
	}, []);

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	const closeSidebar = useCallback(() => {
		setIsSidebarOpen(false);
	}, []);

	return (
		<ArticleContext.Provider
			value={{
				appliedState,
				formState,
				isSidebarOpen,
				updateFormState,
				applyFormState,
				resetFormState,
				toggleSidebar,
				closeSidebar,
			}}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticle = () => {
	const context = useContext(ArticleContext);
	if (!context) {
		throw new Error('useArticle must be used within ArticleProvider');
	}
	return context;
};
