/* eslint-disable no-unused-vars */

import React from 'react';
import { VariantProps } from 'class-variance-authority';
import type { ToastActionElement, ToastProps } from '@/common/components/toast';
import { ACTION_TYPES } from '@/common/constants/common.constant';
import { buttonVariants } from '@/common/components/button';

export interface ISearchFormProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export interface ITableActions<T> {
    dataList: T[];
    selectedRows?: Set<string>;
    handleRowSelect?: (id: string) => void;
    handleSelectAll?: (isChecked: boolean) => void;
    setSelectedItem?: (item: T) => void;
    openModalFn?: () => void;
  }

export interface ITableCustomDesignProps<T> extends ITableActions<T> {
    item: T;
  }

export type THeaderConfig<T> = {
    key: string;
    label: string;
    customDesign?: (props: ITableCustomDesignProps<T>) => React.ReactNode,
    alignEnd?:boolean,
  };

export interface IGlobalTableProps<T> extends ITableActions<T> {
    headers: THeaderConfig<T>[];
    caption?: string;
    showCheckboxes?:boolean
  }

export type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
  };

type ActionType = typeof ACTION_TYPES;

export type IAction =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

export interface IState {
  toasts: ToasterToast[];
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export type Toast = Omit<ToasterToast, 'id'>;

export type ITheme = 'dark' | 'light' | 'system';

export type IThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ITheme;
  storageKey?: string;
};

export type IThemeProviderState = {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
};
